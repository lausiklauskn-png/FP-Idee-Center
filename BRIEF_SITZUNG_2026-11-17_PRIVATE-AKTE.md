# Brief für die nächste Sitzung – Private Akte (17.11.2026)

**Name (Klaus 17.11.): die App heißt „Private Akte“** (zwei Wörter). „Private Act“ war der Arbeitsname von Version 3
und bleibt nur dort stehen; ab Version 4 überall „Private Akte“, Kürzel im Kopf „PA“. Grund: „Act“ heißt im Englischen
nicht Akte, „private act“ ist ein Rechtsbegriff, und der Name lag zu nah an „Private Brain Pro“.

## Neues Repo und Rechtstexte (Klaus 17.11.)

- Das Repo **`lausiklauskn-png/Private-Akte`** ist angelegt (bisher nur README), Adresse der Web-App:
  **https://lausiklauskn-png.github.io/Private-Akte/**. Dort wird gebaut, nicht mehr im Ideen-Center.
  GitHub Pages muss im Repo noch eingeschaltet werden, falls nicht geschehen.
- **Von Anfang an dabei, „als würde ich morgen veröffentlichen“:** Impressum, Datenschutzerklärung, Haftungsausschluss,
  Lizenz und Copyright. Fertiger Entwurf: `entwuerfe/private-akte/rechtliches.html` (eine Seite mit vier Abschnitten,
  Betreiberangaben wie in der Familienakte, `public/datenschutz.html` dort war die Vorlage).
  Als `rechtliches.html` ins neue Repo legen, in der App im Fuß und in der Hilfe verlinken, in den Offline-Vorrat aufnehmen.
- Die Datenschutzerklärung beschreibt **nur den heutigen Stand** (Beispieldaten, nichts gespeichert, kein Netz außer
  GitHub Pages). **Vor jeder Funktion, die speichert oder nach draußen geht** (Tresor, Sicherung, Helfer/KI, Kalender,
  Postfach, BookLedgerPro), den passenden Abschnitt ergänzen – Vorlage sind die Abschnitte der Familienakte.
- **Lizenz: derzeit „Alle Rechte vorbehalten“** (wie die Familienakte, die keine Lizenzdatei hat). Das ist Klaus'
  Entscheidung und von ihm noch nicht bestätigt. Es passt nicht mehr, sobald das Familienbüro (AGPL-3.0) Teil der App
  wird – siehe Punkt 9 unten. Im Repo dazu eine Datei `LICENSE` mit demselben Wortlaut anlegen.
- Kein Anwalt hat die Texte geprüft.

## Stand

- Im Ideen-Center liegen drei Entwürfe (App-Version 1.1.0, auf `main`, PR #1 zusammengeführt):
  Version 1 (Präsentation), Version 2 „Meine Akte“ (Module außerhalb, Laufzettel), Version 3 „Private Act“.
- **Klaus 17.11.: Version 3 gefällt am besten und ist die Grundlage.** Version 2 bleibt als Vergleich stehen.
- Version 3 ist eine einzelne HTML-Datei (`entwuerfe/familienakte/version-3/private-act-entwurf-v3.html`, rund 0,9 MB).
  Baumbild und der kurze Film „Zur Akte“ stecken als Daten in der Datei. Quelle: Discovery-Seite des Datei-Organizers
  (`discovery-runden.jpg`, Ausschnitt aus `discovery-stadt-finale.mp4`), geholt aus `Meine-Familienakte/public/discovery/`.
- Alles ist Demo: erfundene Daten, nichts wird gespeichert, kein echtes Programm wird geöffnet. Geprüft nur im
  Test-Browser (390 px und 1280 px), nicht am Gerät.

## Das Prinzip (von Klaus, 17.11.)

1. **Eine App, ein Repo.** Pflege und Übergaben finden an einer Stelle statt.
2. **Die Halle in der Mitte des Baums ist die Akte.** Dort liegt alles, dort wird gesucht. Eine Datei bleibt, wo sie
   einsortiert wurde; herausgeholt wird immer eine Kopie.
3. **Jede Stadt an einem Ast ist ein Programm** mit nur dem Nötigen. Tipp auf die Stadt öffnet es in derselben App.
4. **Die bunten Kugeln sind Helfer (Agenten).** Sie arbeiten in der Stadt und ordnen dort zu: raten, Klaus berichtigt,
   sie lernen. Zuordnen von Hand muss immer möglich sein.
5. **Klaus bringt die Dateien hinein.** Fertig zugeordnet gehen sie mit „Zur Akte“ direkt in die Halle.
6. **Die Kopie liegt immer in der Akte** (Beispiel Portemonnaie: Bon und Monatsübersicht unter „Geld & Belege“).
7. **Ein neuer Ast = ein neues Programm.** Es ändert nichts an der Halle und nichts an den anderen Städten.

## Auftrag für die nächste Sitzung: Version 4 „Private Akte“ als Vorschau

Version 3 (`entwuerfe/familienakte/version-3/private-act-entwurf-v3.html` im Ideen-Center) als `index.html` ins Repo
`Private-Akte` übernehmen und dort ändern; dazu Manifest, Icons aus `entwuerfe/logo/`, Service Worker und
`rechtliches.html`. Version 3 im Ideen-Center nicht anfassen; im Ideen-Center nur einen Verweis auf die neue Adresse ergänzen.

1. **Familienbüro als Stadt** (Repo `lausiklauskn-png/Familienbuero-Pro`: Schreiben, Tabellen, Folien, PDF).
   Es ersetzt die Stadt „Workflow PDF“ und die geplante Stadt „Notizen & Briefe“. Im Familienbüro vier Kacheln wie dort;
   die PDF-Kachel heißt **„Workflow PDF“** (PDF-Zeichen bleibt), damit klar ist, was sich öffnet.
   Dazu ein eigener Knopf „Workflow PDF“ in der Leiste oben im Programm.
2. **Portemonnaie mit Außenweg zu BookLedgerPro.** Im Portemonnaie stehen Ausgaben und Einnahmen mit „wofür“.
   Neuer Knopf „An BookLedgerPro geben“ (Monat als Datei); die Buchhaltung selbst bleibt draußen.
   Im Baum als Weg nach außen zeigen (Rand des Bildes), nicht als Stadt.
3. **Leiste oben:** Drucken (Seite / einzelne Unterlage), Landkarte, Farbpalette. Fassung links beim Namen.
   Am Handy darf die Leiste nicht voll werden (Klaus: bei der Familienakte „überfüllt“) – Vorschlag unten, Punkt 8.
4. **Logo:** das Zeichen des Ideen-Centers (`assets/fp-ideen-center-logo.png`, ohne Schrift) für Kopf links, Icon,
   Favicon und blass im Hintergrund. **Klaus 17.11.: so, auf Weiß, ist es die Basic-Variante. Die Pro-Variante bekommt
   einen deutlichen Farbrand, der nach innen weiß wird** – entweder im Verlauf der Logofarben oder einfarbig blau –,
   damit Basic und Pro nicht verwechselt werden. **Klaus 17.11.: der bunte Verlauf; das Zeichen soll in allen
   Fassungen groß sein; bei runden Knöpfen darf der Rand nicht abgeschnitten aussehen.** Fertige Dateien unter `entwuerfe/logo/`:
   `private-akte-basic.png` und `private-akte-basic-rund.png`; `private-akte-pro-verlauf.png` (eckig),
   `private-akte-pro-rund.png` und `private-akte-pro-vollflaeche.png` (Farbe kreisförmig bis in die Ecken; als Icon für
   Android und PWA „maskable“ nehmen, das Gerät schneidet rund oder eckig-rund zu). Übersicht `vergleich-alle.png`.
5. **Kalender-Knopf** (Klaus 17.11.). Öffnet Termine und Fristen. Eine Notiz oder Unterlage kann von dort oder über
   „Bearbeiten mit“ einen Termin bekommen.
6. **Notizen, ganz normal** (Klaus 17.11.). Notiz schreiben oder sprechen, Klaus ordnet sie **von Hand** der Akte zu
   (er schreibt dazu, was es ist). Kein Helfer nötig.
7. **„Bearbeiten mit“** an allem, was in der Akte liegt oder gerade hereinkommt (Unterlage, Foto, Notiz):
   Auswahl der Stadt, die weiterarbeitet (Familienbüro, Workflow PDF, Portemonnaie, Datei-Organizer, Kalender).
   Die Sache gilt als in der Akte angekommen; bearbeitet wird eine Kopie in der Stadt.
8. **Leiste oben als Werkzeugleiste** (Klaus 17.11.): die Werkzeuge als Knöpfe, dazu die Spezialknöpfe, die zu
   einem Modul gehören und es gleich an der richtigen Stelle öffnen:
   - „Bon fotografieren“ → Portemonnaie
   - „PDF scannen“ (Foto zu PDF) → Workflow PDF im Familienbüro
   - „Dateien hineingeben“ (ganze Dateien oder Ordner) → Datei-Organizer
   - „Notiz“ → Notiz in der Akte
   - „Kalender“ → Kalender
   Der grüne Knopf „Ablegen“ aus Version 3 geht darin auf oder bleibt als Sammelknopf – in der Vorschau zeigen
   und Klaus entscheiden lassen.
9. Ideen-Center: in `ideen.json` einen Eintrag mit Verweis auf die neue Adresse; App-Version dort erhöhen.

## Geprüft: Was noch fehlt oder zu entscheiden ist

Klaus bat um Durchsicht, ob etwas vergessen wurde. Diese Punkte kommen in Version 3 nicht oder nur am Rand vor:

1. **Kalender: entschieden, kommt hinein** (Auftrag Punkt 5). Offen bleibt nur die Erinnerung (Glocke der
   Familienakte oder Gerätekalender).
2. **Notizen: entschieden, kommen hinein** (Auftrag Punkt 6), von Hand zugeordnet. Ob der Kalender eine eigene Stadt
   im Baum bekommt oder nur ein Knopf ist, in der Vorschau zeigen.
3. **Sicherung und Tresor.** Nur als Schild im Kopf angedeutet. Bei einer App: ein Speicherort, eine Sicherung.
4. **E-Mail (Private Brain).** Ist als Stadt gebaut. Bleibt sie?
5. **Pseudonymisieren und „An KI“** (PseudoDoc, Pseudo-Fenster der Familienakte) kommen nicht vor. Eigene Stadt,
   Teil des Familienbüros oder weglassen?
6. **Wer sind die Helfer?** Auf dem Gerät (Sortier-Kern, kleine Modelle) oder über einen Server. Das entscheidet über
   Netz, Kosten und Datenschutz und sollte je Stadt sichtbar sein.
7. **Größe.** Das Familienbüro ist groß: im Repo liegen unter `public/` rund 450 MB (Büro-Kern, davon rund 100 MB
   ostasiatische Schriften). Zusammen mit Discovery wird eine App deutlich größer als die geschätzten 100 MB.
   Vorschlag: Die Stadt Familienbüro wird beim ersten Öffnen nachgeladen statt im Paket mitgeliefert.
8. **Leiste am Handy.** Werkzeug- und Spezialknöpfe (Auftrag Punkt 8) plus Drucken, Landkarte, Farbpalette,
   Sicherung und Hilfe sind zu viele für eine Zeile. Vorschlag: sichtbar sind die Knöpfe, mit denen etwas
   hereinkommt (Bon, Scan, Dateien, Notiz, Kalender), zum Wischen; Drucken, Landkarte, Farbpalette, Sicherung und
   Hilfe hinter „⋯“. Am PC ist Platz für alle.
9. **Lizenz des Familienbüros (AGPL-3.0).** Laut dessen CLAUDE.md muss der Quelltext offen bleiben und der
   Herkunftshinweis in der App stehen. Wird das Familienbüro Teil einer App, gilt das voraussichtlich für die ganze
   App. Vor dem echten Bau klären; für die Vorschau ohne Bedeutung.
10. **Logo.** Basic und Pro sind über den Rand unterschieden, Pro mit buntem Verlauf (Auftrag Punkt 4).
    Das Ideen-Center trägt dasselbe Zeichen wie die Basic-Variante – auf dem Startbildschirm sehen beide gleich aus.
11. **Repo.** Der Name steht („Private Akte“); das neue Repo ist noch nicht angelegt. Ob der Name als Marke frei ist,
    ist nicht geprüft (DPMA, EUIPO) – vor einer Veröffentlichung im Store nachsehen.
    Basic und Pro gibt es (siehe Logo); welche Teile nur Pro hat, ist nicht entschieden.
12. **Echter Bau.** Die Vorschauen haben keinen Kern. Der liegt in `Meine-Familienakte` (Sortier-Kern, Tresor,
    Eingang, Suche, Sicherung). Welche Teile übernommen werden, ist ein eigener Plan nach Version 4.

## Offen aus dieser Sitzung

- Sprecherstimme („Arthur“) und umgebaute Filme über Higgsfield: nicht gemacht, kostet Guthaben, braucht Klaus' Ja.
- Veröffentlichte Seite nach dem Zusammenführen nicht nachgeprüft (Zugriff auf GitHub Pages war in der Sitzung gesperrt).

## Regeln, die hier gelten

- Frühere Entwurfsversionen bleiben erhalten; jede Version ist eine eigenständige HTML-Datei in ihrem Ordner.
- Beispieldaten erfunden, kein Personenname in sichtbaren Texten, simulierte Funktionen kennzeichnen.
- Zusammenführen auf `main` nur auf Klaus' Wort.

## Startauftrag

```
Lies im Repo FP-Idee-Center zuerst BRIEF_SITZUNG_2026-11-17_PRIVATE-AKTE.md.
Baue im Repo lausiklauskn-png/Private-Akte (Adresse https://lausiklauskn-png.github.io/Private-Akte/) die erste
Fassung der „Privaten Akte“ auf der Grundlage von Version 3 aus dem Ideen-Center:
1. Familienbüro als Stadt statt „Workflow PDF“ und „Notizen & Briefe“; die PDF-Kachel darin heißt „Workflow PDF“.
2. Portemonnaie mit Knopf „An BookLedgerPro geben“ und Weg nach außen im Baum.
3. Leiste oben als Werkzeugleiste: Bon fotografieren (Portemonnaie), PDF scannen (Workflow PDF), Dateien hineingeben
   (Datei-Organizer), Notiz, Kalender; dazu Drucken, Landkarte, Farbpalette. Fassung links beim Namen; am Handy nicht überfüllt.
4. Logos aus entwuerfe/logo/ (Basic auf Weiß, Pro mit buntem Rand) für Kopf, Icon, Favicon und Hintergrund.
5. Notizen von Hand zuordnen; „Bearbeiten mit“ an jeder Unterlage, jedem Foto und jeder Notiz.
6. Von Anfang an: rechtliches.html (Impressum, Datenschutz, Haftungsausschluss, Lizenz & Copyright) aus
   entwuerfe/private-akte/, verlinkt im Fuß und in der Hilfe, dazu die Datei LICENSE.
Frage mich vorher zu den offenen Punkten unter „Was noch fehlt oder zu entscheiden ist“, soweit sie diese Fassung
betreffen (E-Mail, Pseudonymisieren, Leiste am Handy, Knopf „Ablegen“, Lizenz). Prüfe im Test-Browser in Handy- und
PC-Breite, lege einen Entwurfs-PR an und zeige mir die Datei.
```
