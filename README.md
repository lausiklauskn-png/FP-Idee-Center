# FP Ideen-Center

Installierbare Web-App für Ideen und ihre nummerierten HTML-Entwürfe. GitHub Pages veröffentlicht den Hauptordner von `main`.

- Start: `index.html`
- Entwürfe und deren Inhalte: `ideen.json`
- App-Version: `version.json`
- PWA: `manifest.webmanifest` und `sw.js`
- Bootstrap 5.3.3 liegt mit Lizenz unter `vendor/`; zur Laufzeit ist kein CDN nötig.
- Das eigene Logo liegt unter `assets/`, die Installationssymbole unter `icons/`.

## Eine weitere Entwurfsversion ergänzen

1. Die neue eigenständige HTML-Datei in einen neuen Ordner legen, zum Beispiel `entwuerfe/familienakte/version-2/`. Frühere Versionen erhalten.
2. In `ideen.json` unter dem jeweiligen Projekt einen weiteren Eintrag in `versions` ergänzen: `version`, `title`, `date`, `summary`, `url` und `contents`. Die Oberfläche ordnet die Buttons aufsteigend, neue Versionen stehen unter den bisherigen.
3. Für ein neues Thema einen weiteren Eintrag in `projects` ergänzen. Es bekommt automatisch einen eigenen Bereich.
4. Die App-Version in `version.json`, `app.js`, `sw.js` und den Asset-Parametern in `index.html` gemeinsam erhöhen. Neue Entwürfe für die Offline-Nutzung in die `SHELL`-Liste des Service Workers aufnehmen.

„Versionen“ zeigt die Inhalte der Ideen, „Aktualisieren“ lädt den neuesten verfügbaren Stand und prüft auf ein App-Update. Nach dem ersten vollständigen Laden bleiben die App und die mitgelieferten Entwürfe offline erreichbar. Die Installation verwendet den Browserdialog, sofern angeboten; andernfalls zeigt der Installationsbutton den passenden Weg im Browsermenü. Die Website bleibt unabhängig davon im Browser nutzbar.

Die Entwurfsnummern, zum Beispiel Familienakte Version 1, sind unabhängig von der App-Version des Ideen-Centers.
