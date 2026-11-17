'use strict';
(() => {
  const APP_VERSION = '1.1.0';
  const base = new URL('./', document.baseURI);
  const byId = id => document.getElementById(id);
  let catalog = null, registration = null, installPrompt = null;
  let refreshRunning = false, updateRequested = false, reloadStarted = false;
  let requestSequence = 0, lastCatalogRequest = 0;

  function feedback(text) { byId('app-feedback').textContent = text; }
  function connection(cached = false) {
    const offline = !navigator.onLine || cached;
    document.body.classList.toggle('offline', offline);
    const label = byId('connection-label');
    label.replaceChildren();
    const dot = document.createElement('span'); dot.className = 'status-dot'; dot.setAttribute('aria-hidden', 'true');
    label.append(dot, document.createTextNode(offline ? 'Gespeicherter Stand · offline verfügbar' : 'Bereit zum Entdecken'));
  }
  function node(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }
  function localHtml(value) {
    if (typeof value !== 'string' || !value || value.length > 1000) return false;
    try {
      const url = new URL(value, base);
      return url.origin === base.origin && url.pathname.startsWith(base.pathname) && /\.html?$/i.test(url.pathname);
    } catch { return false; }
  }
  function checkCatalog(data) {
    if (!data || data.schemaVersion !== 1 || !Array.isArray(data.projects)) throw Error('Invalid idea catalog');
    const projectIds = new Set();
    for (const project of data.projects) {
      if (!project || !/^[a-z0-9-]+$/.test(project.id) || projectIds.has(project.id) || typeof project.title !== 'string' || !Array.isArray(project.versions)) throw Error('Invalid idea project');
      projectIds.add(project.id);
      const numbers = new Set();
      for (const version of project.versions) {
        if (!version || !Number.isInteger(version.version) || version.version < 1 || numbers.has(version.version) || typeof version.title !== 'string' || !localHtml(version.url) || !Array.isArray(version.contents) || version.contents.some(x => typeof x !== 'string')) throw Error('Invalid idea version');
        numbers.add(version.version);
      }
      if (project.ideaUrl && !localHtml(project.ideaUrl)) throw Error('Invalid idea sheet');
    }
    return data;
  }
  function externalArrow() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class','ui-icon'); svg.setAttribute('viewBox','0 0 24 24'); svg.setAttribute('aria-hidden','true');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path'); path.setAttribute('d','M6 18 18 6M6 6h12v12'); svg.append(path); return svg;
  }
  function versionLink(version) {
    const link = node('a', 'draft-button'); link.href = version.url;
    link.append(node('span', 'version-number', String(version.version).padStart(2, '0')));
    const copy = node('span', 'draft-copy');
    copy.append(node('strong', '', version.title), node('small', '', version.summary || 'Entwurf ansehen'));
    const open = node('span', 'draft-open', 'Ansehen ');
    open.append(externalArrow());
    link.append(copy, open);
    return link;
  }
  function renderCatalog(data) {
    const projects = document.createDocumentFragment(), versions = document.createDocumentFragment();
    let total = 0;
    for (const project of data.projects) {
      const ordered = [...project.versions].sort((a, b) => a.version - b.version);
      total += ordered.length;
      const section = node('section', 'project-section');
      const headingId = 'project-' + project.id;
      section.setAttribute('aria-labelledby', headingId);
      const header = node('div', 'project-header');
      const mark = node('span', 'project-mark', project.mark || project.title.slice(0, 2)); mark.setAttribute('aria-hidden', 'true');
      const copy = node('div'); const heading = node('h3', '', project.title); heading.id = headingId;
      copy.append(heading, node('p', '', project.description || 'Ideen und ihre Entwurfsstände.')); header.append(mark, copy);
      const list = node('div', 'version-list'); ordered.forEach(version => list.append(versionLink(version)));
      section.append(header, list);
      if (project.ideaUrl) { const idea = node('a', 'idea-link', 'Deine Idee hinzufügen '); idea.append(externalArrow()); idea.href = project.ideaUrl; section.append(idea); }
      projects.append(section);

      const group = node('section', 'version-group'); group.append(node('p', 'version-group-title', project.title));
      for (const version of ordered) {
        const item = node('article', 'version-detail'); item.append(node('h3', '', version.title));
        if (/^\d{4}-\d{2}-\d{2}$/.test(version.date || '')) {
          const date = new Date(version.date + 'T12:00:00Z');
          if (!Number.isNaN(date.valueOf())) item.append(node('span', 'version-date', new Intl.DateTimeFormat('de-DE', {dateStyle:'long', timeZone:'Europe/Berlin'}).format(date)));
        }
        if (version.summary) item.append(node('p', 'version-description', version.summary));
        const contents = node('ul', 'version-details-list'); version.contents.forEach(text => contents.append(node('li', '', text)));
        item.append(contents); const open = node('a', 'btn modal-open-button', 'Entwurf ansehen '); open.append(externalArrow()); open.href = version.url; item.append(open); group.append(item);
      }
      versions.append(group);
    }
    if (!total) projects.append(node('p', 'next-version-note', 'Hier erscheinen die ersten Entwürfe.'));
    byId('project-list').replaceChildren(projects);
    byId('version-content').replaceChildren(versions);
    byId('collection-count').textContent = total + (total === 1 ? ' Entwurf' : ' Entwürfe');
  }
  async function getJson(path) {
    const response = await fetch(new URL(path, base), {cache:'no-store'});
    if (!response.ok) throw Error('Download failed');
    return {data:await response.json(), cached:response.headers.get('X-FP-Source') === 'cache'};
  }
  async function loadCatalog({quiet = false} = {}) {
    const sequence = ++requestSequence; lastCatalogRequest = Date.now();
    const results = await Promise.allSettled([getJson('ideen.json'), getJson('version.json')]);
    if (sequence !== requestSequence) return {fresh:false};
    if (results[0].status !== 'fulfilled') {
      connection(true);
      if (!quiet) feedback('Die Verbindung fehlt. Du kannst den gespeicherten Stand ansehen.');
      return {fresh:false};
    }
    try { catalog = checkCatalog(results[0].value.data); renderCatalog(catalog); }
    catch { if (!quiet) feedback('Die neue Ideenliste ist nicht lesbar. Der bisherige Stand bleibt sichtbar.'); return {fresh:false}; }
    const cached = results[0].value.cached; connection(cached);
    return {fresh:!cached, version:results[1].status === 'fulfilled' ? results[1].value.data.version : null};
  }
  function showUpdate() { byId('update-notice').hidden = !registration?.waiting; }
  function watchInstalling(worker) {
    if (!worker) return;
    worker.addEventListener('statechange', () => {
      if (worker.state === 'installed' && navigator.serviceWorker.controller) showUpdate();
    });
  }
  async function setupServiceWorker() {
    if (!('serviceWorker' in navigator) || !window.isSecureContext) return null;
    try {
      registration = await navigator.serviceWorker.register(new URL('sw.js', base), {scope:base.pathname, updateViaCache:'none'});
      registration.addEventListener('updatefound', () => watchInstalling(registration.installing));
      watchInstalling(registration.installing); showUpdate();
      registration.update().catch(() => {});
      return registration;
    } catch { return null; }
  }
  const swReady = setupServiceWorker();
  if ('serviceWorker' in navigator) navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!updateRequested || reloadStarted) return;
    reloadStarted = true; location.reload();
  });
  function activateUpdate() {
    if (!registration?.waiting) return false;
    updateRequested = true; registration.waiting.postMessage({type:'SKIP_WAITING'});
    feedback('Die neue App-Version wird geöffnet …'); return true;
  }
  async function waitForInstall(worker) {
    if (!worker || ['installed','activated','redundant'].includes(worker.state)) return;
    await new Promise(resolve => {
      const timer = setTimeout(done, 12000);
      function done() { clearTimeout(timer); worker.removeEventListener('statechange', changed); resolve(); }
      function changed() { if (['installed','activated','redundant'].includes(worker.state)) done(); }
      worker.addEventListener('statechange', changed);
    });
  }
  async function refresh() {
    if (refreshRunning) return;
    refreshRunning = true;
    const button = byId('refresh-button'); button.disabled = true; button.classList.add('is-refreshing');
    feedback('Suche nach dem neuesten Stand …');
    try {
      const loaded = await loadCatalog(); await swReady;
      if (registration && navigator.onLine) { try { await registration.update(); await waitForInstall(registration.installing); } catch {} }
      if (activateUpdate()) return;
      if (loaded.fresh) feedback(loaded.version && loaded.version !== APP_VERSION ? 'Die Ideen sind aktuell. Die App-Aktualisierung wird vorbereitet.' : 'Alle verfügbaren Ideen und Versionen sind aktuell.');
      else feedback('Keine aktuelle Verbindung. Der gespeicherte Stand bleibt verfügbar.');
    } finally { refreshRunning = false; button.disabled = false; button.classList.remove('is-refreshing'); }
  }
  byId('refresh-button').addEventListener('click', refresh);
  byId('apply-update-button').addEventListener('click', () => { if (!activateUpdate()) refresh(); });
  byId('versions-modal').addEventListener('show.bs.modal', () => { if (Date.now() - lastCatalogRequest > 30000) loadCatalog({quiet:true}); });

  function isInstalled() { return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true; }
  function setInstallState() { const installed = isInstalled(); byId('install-label').textContent = installed ? 'Installiert' : 'Installieren'; byId('install-button').disabled = installed; }
  window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); installPrompt = event; setInstallState(); });
  window.addEventListener('appinstalled', () => { installPrompt = null; byId('install-label').textContent = 'Installiert'; byId('install-button').disabled = true; feedback('Das FP Ideen-Center ist als App installiert.'); });
  window.matchMedia('(display-mode: standalone)').addEventListener?.('change', setInstallState);
  byId('install-button').addEventListener('click', async () => {
    if (installPrompt) {
      const prompt = installPrompt; installPrompt = null;
      try { await prompt.prompt(); const choice = await prompt.userChoice; feedback(choice.outcome === 'accepted' ? 'Die Installation wird vorbereitet.' : 'Du kannst das Ideen-Center weiterhin im Browser nutzen.'); }
      catch { feedback('Bitte die Installation über das Browsermenü öffnen.'); }
      return;
    }
    const ua = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    byId('install-instructions').textContent = ios
      ? 'Öffne diese Seite in Safari. Tippe auf „Teilen“ und anschließend auf „Zum Home-Bildschirm“.'
      : /Android/.test(ua)
        ? 'Öffne das Browsermenü (⋮), zum Beispiel in Chrome, und wähle „App installieren“ oder „Zum Startbildschirm hinzufügen“.'
        : 'In Chrome oder Edge: Wähle das Installationssymbol in der Adressleiste oder „App installieren“ im Browsermenü. In Safari auf dem Mac findest du „Zum Dock hinzufügen“ im Menü „Ablage“.';
    if (window.bootstrap?.Modal) window.bootstrap.Modal.getOrCreateInstance(byId('install-modal')).show();
    else feedback(byId('install-instructions').textContent);
  });
  window.addEventListener('offline', () => { connection(true); feedback('Du bist offline. Bereits geladene Entwürfe bleiben verfügbar.'); });
  window.addEventListener('online', () => { connection(); loadCatalog({quiet:true}); registration?.update().catch(() => {}); });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && Date.now() - lastCatalogRequest > 60000) { loadCatalog({quiet:true}); registration?.update().catch(() => {}); } });
  setInstallState(); connection(); loadCatalog({quiet:true});
})();
