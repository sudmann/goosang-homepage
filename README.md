<center>
<img src="https://prod.cloud.rockstargames.com/crews/sc/7301/17742092/publish/emblem/emblem_512.png" width="200" alt="goosang.de">

</center>

Codebase zum bisschen basteln für die goosang Website.

Benutzt [Astro](https://astro.build/) fürs Frontend mit der Möglichkeit,
statisches HTML zu generieren und [Payload](https://payloadcms.com/) als
Content-Management-System fürs Backend.

<hr>

<center>

Dieses Git Repository ist halal zertifiziert.

<img src="https://1000logos.net/wp-content/uploads/2021/02/Halal-logo.png" width="120">

</center>

<hr>

## Getting Started

### Software Requirements

Folgende Software muss installiert sein, damit du den Code bauen kannst:

* [git](https://git-scm.com/): Zum herunterladen und arbeiten mit dem Code.
* [Nodejs](https://nodejs.org/) (am besten das aktuelle LTS verwenden)
* [Node Package Manager](https://docs.npmjs.com/about-npm) (npm) - Wird mit Nodejs mitinstalliert.

Falls Payload als Content-Management-System (CMS) verwendet werden soll:

* [PostgreSQL](https://www.postgresql.org/) als Datenbankserver

Optionale Software:

* [Docker](https://www.docker.com/): Damit lassen sich Anwendungen in so genannten Containern, vergleichbar mit einer Virtuellen Maschine (VM) starten und voneinander abschirmen.
* Einen Webserver (z.B [Nginx](https://nginx.org/)), falls man die generierte statische Seite hosten möchte.

### Repository auf deinen Rechner klonen

Die benötigte Software hast du installiert? Gut, dann kannst du jetzt dieses
Repository auf deinen lokalen Rechner herunterladen (klonen).
Dazu öffnest du eine Kommandozeile (Terminal) und führst folgenden Befehl aus:

```sh
    git clone https://github.com/sudmann/goosang-homepage.git
```

Das klont das Repository in das `goosang-homepage/` Verzeichnis auf deinem lokalen Rechner.

### Dependencies installieren

Bevor du mit dem Code arbeiten kannst, musst du einige benötigte Softwarepakete
(so genannte Dependencies) installieren.
Dazu wechselst du in einem Terminal in den Order, der im vorherigen Schritt
angelegt wurde und führst folgenden Befehl aus:

```sh
npm install
```

Der `install` Befehl sollte erneut ausgeführt werden, wenn du pullst oder den branch wechselst.

### Das Projekt bauen

Es gibt mehrere Optionen wie das Projekt gebaut werden kann.

* **Static HTML**: Das Frontend wird als statisches HTML gebaut, welches dann mittels eines statischen Webservers (z.B. Nginx) gehostet werden kann.
* **Server-Side Rendered (SSR) mit Payload CMS**: Es wird eine Anwendung gebaut, die einen Server entält, der das HTML bei jedem Aufruf neu erzeugt. Das erlaubt es dynamische Inhalte, verwaltet mit dem CMS, zu generieren.

#### Static HTML

Um statisches HTML und assets zu erzeugen, kann der folgende Befehl benutzt werden:

```sh
npm run build:static
```

Die fertig gebauten Dateien befinden sich dann im Order `.dist/static`.

#### SSR mit PayloadCMS

Um dynamisches, serverseitig erzeugtes HTML zu generieren, wird der folgende Befehl benutzt:

```sh
npm run build
```

Die fertig gebauten Dateien befinden sich dann im Ordner `.build/`.

Das Programm lässt sich dann mittels Node über die Datei `.build/server.cjs` starten oder mittels `npm run` skript.

```sh
node .build/server.cjs --serve
# oder
npm run serve
```