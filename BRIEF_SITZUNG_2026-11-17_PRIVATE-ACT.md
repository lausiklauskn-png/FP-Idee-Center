# Brief für die nächste Sitzung – Private Act (17.11.2026)

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

## Auftrag für die nächste Sitzung: Version 4 als Vorschau

Version 3 kopieren nach `entwuerfe/familienakte/version-4/` und dort ändern. Version 3 nicht anfassen.

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
   Favicon und blass im Hintergrund.
5. Ideen-Center nachziehen: `ideen.json`, `version.json`, `app.js`, `sw.js` (SHELL), Parameter in `index.html`.

## Geprüft: Was noch fehlt oder zu entscheiden ist

Klaus bat um Durchsicht, ob etwas vergessen wurde. Diese Punkte kommen in Version 3 nicht oder nur am Rand vor:

1. **Fristen und Erinnerung.** Version 3 zeigt nur zwei Fristen auf der Startseite. Glocke und Kalender der
   Familienakte fehlen. Vorschlag: Fristenliste bleibt in der Akte, Erinnerung über den Gerätekalender.
2. **Notizen.** Mit dem Familienbüro fällt die Stadt „Notizen & Briefe“ weg. Briefe gehen ins Familienbüro; wohin die
   schnelle Notiz (Text, Sprache, Foto)? Vorschlag: ein Punkt unter „Ablegen“, Ablage direkt in der Akte.
3. **Sicherung und Tresor.** Nur als Schild im Kopf angedeutet. Bei einer App: ein Speicherort, eine Sicherung.
4. **E-Mail (Private Brain).** Ist als Stadt gebaut. Bleibt sie?
5. **Pseudonymisieren und „An KI“** (PseudoDoc, Pseudo-Fenster der Familienakte) kommen nicht vor. Eigene Stadt,
   Teil des Familienbüros oder weglassen?
6. **Wer sind die Helfer?** Auf dem Gerät (Sortier-Kern, kleine Modelle) oder über einen Server. Das entscheidet über
   Netz, Kosten und Datenschutz und sollte je Stadt sichtbar sein.
7. **Größe.** Das Familienbüro ist groß: im Repo liegen unter `public/` rund 450 MB (Büro-Kern, davon rund 100 MB
   ostasiatische Schriften). Zusammen mit Discovery wird eine App deutlich größer als die geschätzten 100 MB.
   Vorschlag: Die Stadt Familienbüro wird beim ersten Öffnen nachgeladen statt im Paket mitgeliefert.
8. **Leiste am Handy.** Mit Drucken, Landkarte, Farbpalette, Sicherung und Hilfe sind es fünf Knöpfe.
   Vorschlag: am Handy Farbpalette und Hilfe sichtbar, der Rest hinter „⋯“.
9. **Lizenz des Familienbüros (AGPL-3.0).** Laut dessen CLAUDE.md muss der Quelltext offen bleiben und der
   Herkunftshinweis in der App stehen. Wird das Familienbüro Teil einer App, gilt das voraussichtlich für die ganze
   App. Vor dem echten Bau klären; für die Vorschau ohne Bedeutung.
10. **Logo doppelt.** Dasselbe Zeichen für Ideen-Center und Private Act liegt dann zweimal gleich auf dem
    Startbildschirm. Vorschlag: gleiche Form, andere Farbe.
11. **Name und Repo.** „Private Act“ steht für Version 3; das neue Repo und sein Name sind noch nicht angelegt.
    Web-App und native Apps (Basic/Pro wie bei der Familienakte) sind nicht entschieden.
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
Lies im Repo FP-Idee-Center zuerst BRIEF_SITZUNG_2026-11-17_PRIVATE-ACT.md.
Baue Version 4 „Private Act“ als anklickbare Vorschau auf der Grundlage von Version 3
(Ordner entwuerfe/familienakte/version-4/, Version 3 bleibt unverändert):
1. Familienbüro als Stadt statt „Workflow PDF“ und „Notizen & Briefe“; die PDF-Kachel darin heißt „Workflow PDF“.
2. Portemonnaie mit Knopf „An BookLedgerPro geben“ und Weg nach außen im Baum.
3. Leiste oben: Drucken, Landkarte, Farbpalette; Fassung links beim Namen; am Handy nicht überfüllt.
4. Logo des Ideen-Centers für Kopf, Icon, Favicon und Hintergrund.
Frage mich vorher zu den Punkten 1–11 unter „Was noch fehlt oder zu entscheiden ist“, soweit sie Version 4 betreffen
(Notizen, E-Mail, Pseudonymisieren, Leiste am Handy, Logo-Farbe). Danach Ideen-Center nachziehen,
im Test-Browser in Handy- und PC-Breite prüfen, Entwurfs-PR anlegen und mir die Datei zeigen.
```
