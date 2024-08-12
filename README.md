 
# CelestialClusters

## Overview
CelestialClusters is a visually immersive tool that brings data clusters to life within a celestial-themed environment. Utilizing HTML5 Canvas and JavaScript, this tool offers interactive exploration of data clusters set against star-studded backdrops.



https://github.com/user-attachments/assets/865c22ba-5d93-466c-a862-794beaa32f12

![Bildschirmfoto vom 2024-08-12 10-13-06](https://github.com/user-attachments/assets/d8476395-689c-4a38-813c-aa5451c60496)
![Bildschirmfoto vom 2024-08-12 10-13-10](https://github.com/user-attachments/assets/f779cb9c-3852-423a-89e0-0533dfed88fc)



## Features
- **Celestial Backdrops**: Data clusters are overlaid on celestial star patterns.
- **Interactive Clusters**: Zoom, pan, and click to delve into cluster details.
- **Flexible Canvas**: The canvas adjusts to fit various screen sizes for optimal viewing.

## Demo
Check out a live demo of the project on CodePen:
[CelestialClusters Demo](https://codepen.io/yourcodepenlink)

## Installation
To run this project locally, clone the repository and open the `index.html` file in your browser.

```bash
git clone https://github.com/yourusername/CelestialClusters.git
cd CelestialClusters


```
Then, open index.html in your preferred web browser.

## Usage
- Zoom: Use the mouse wheel to zoom in and out.
- Pan: Click and drag to move around the canvas.
- Click: Click on a data point to see more information about the user it represents.


## License
This project is licensed under the MIT License.



## Cross-Origin Resource Sharing (CORS) Server

Um das Projekt lokal zu testen und sicherzustellen, dass keine CORS-Probleme auftreten, wird ein einfacher Python-Server (`cors_server.py`) bereitgestellt. Dieser Server fügt die notwendigen CORS-Header hinzu, um den Zugriff von verschiedenen Quellen zu ermöglichen.

#### Starten des CORS-Servers

1. Stelle sicher, dass Python installiert ist (Python 3 empfohlen).
2. Navigiere in das Projektverzeichnis.
3. Starte den Server mit folgendem Befehl:
   ```sh
   python3 cors_server.py
   ```
4. Der Server wird auf `http://localhost:8000` laufen.

Der `cors_server.py` ist im Projekt enthalten, um sicherzustellen, dass die HTML-Dateien problemlos von einem lokalen Server geladen werden können, ohne dass CORS-Probleme auftreten. Dies ist besonders nützlich, wenn das Projekt auf verschiedene Domains oder Subdomains verteilt wird.

____________________________

## Cluster-Visualisierung in eine Vue.js-Anwendung 

Wenn du die bestehende Cluster-Visualisierung in eine Vue.js-Anwendung integrieren möchtest, besonders wenn die Daten für die Cluster aus einer Datenbank kommen, gibt es einige technische Aspekte zu beachten:

### 1. **Integration von Canvas in eine Vue-Komponente**:
   - **Canvas in Vue-Komponenten**: In Vue.js kannst du das `<canvas>`-Element direkt in der Template-Sektion einer Vue-Komponente verwenden. Allerdings sind die meisten Canvas-Operationen imperative (d.h. sie basieren auf direkten Befehlen), während Vue.js reaktiv arbeitet. Das bedeutet, dass du darauf achten musst, wann und wie du auf das Canvas zugreifst.
   - **DOM-Zugriff**: Um auf das Canvas-Element zuzugreifen, musst du das `ref`-Attribut verwenden und sicherstellen, dass du den Canvas-Kontext erst dann initialisierst, wenn die Komponente gemountet ist. Das bedeutet, dass du den Zugriff auf das Canvas im `mounted()`-Hook von Vue.js durchführst:
     ```javascript
     mounted() {
         const canvas = this.$refs.canvas;
         const ctx = canvas.getContext('2d');
         // Initialisierung und Zeichnen auf dem Canvas
     }
     ```
   - **Reaktive Datenbindung**: Da Vue.js auf reaktiven Daten basiert, musst du sicherstellen, dass Änderungen an den Cluster-Daten das Canvas korrekt neu zeichnen. Das bedeutet, dass du entweder watch- oder computed-Eigenschaften verwenden kannst, um auf Änderungen zu reagieren und das Canvas neu zu rendern.

### 2. **Datenbindung und Performance**:
   - **Daten aus einer Datenbank**: Wenn die Cluster-Daten aus einer Datenbank stammen, musst du sicherstellen, dass die Daten asynchron geladen werden (z.B. über eine API), bevor sie an das Canvas übergeben werden. Du kannst Axios oder Fetch verwenden, um die Daten zu laden, und diese dann im `data()`-Objekt der Vue-Komponente speichern.
   - **Performance**: Canvas ist sehr performant, wenn es um das Zeichnen von Grafiken geht, aber es gibt keine automatische Datenbindung wie bei DOM-Elementen. Das bedeutet, dass du bei Änderungen der Daten explizit das Canvas neu zeichnen musst. Das kann durch ein hohes Volumen an Daten zu Performanceproblemen führen, wenn es nicht richtig gehandhabt wird.

### 3. **Umgang mit reaktiven Daten**:
   - **Reaktivität vs. Imperative Befehle**: Vue.js ist darauf ausgelegt, reaktiv auf Datenänderungen zu reagieren. Im Gegensatz dazu funktioniert Canvas eher imperativ. Das kann zu Herausforderungen führen, wenn du sicherstellen musst, dass das Canvas nur dann aktualisiert wird, wenn es notwendig ist. Zum Beispiel sollten Änderungen an Daten nur dann das Canvas neu zeichnen, wenn sie sich tatsächlich auf das, was angezeigt wird, auswirken.

### 4. **Interaktivität und Ereignisbehandlung**:
   - **Event-Handling im Canvas**: Du kannst normale JavaScript-Event-Listener wie `click`, `mousemove`, etc., auf das Canvas anwenden. Allerdings musst du sicherstellen, dass die Events korrekt in Vue.js integriert sind, insbesondere wenn die Events auf reaktive Daten zugreifen. Hier ist die technische Herausforderung sicherzustellen, dass Event-Handler keine unerwarteten Reaktionen in der Vue-Komponente auslösen, die zu Render- oder Logikfehlern führen könnten.
   - **Trennung der Logik**: Es ist wichtig, die Logik des Zeichnens (Canvas) und die Logik der Datenverwaltung (Vue.js) klar zu trennen. Wenn du z.B. auf ein Element im Canvas klickst und Daten in der Sidebar anzeigen möchtest, sollte die Vue-Komponente die Logik zur Verwaltung der Sidebar-Daten übernehmen, während das Canvas nur für die Darstellung zuständig ist.

### 5. **Skalierbarkeit und Erweiterbarkeit**:
   - **Komponentisierung**: Du solltest erwägen, die Canvas-Logik in eine eigene Vue-Komponente auszulagern. Dadurch bleibt der Code modular und leicht wartbar. Du könntest z.B. eine `ClusterCanvas.vue`-Komponente erstellen, die das gesamte Canvas-Rendering übernimmt.
   - **Erweiterbarkeit**: Wenn die Anwendung wächst, kann es notwendig sein, das Canvas dynamisch in Bezug auf die Größe und Anzahl der zu zeichnenden Elemente zu skalieren. Das sollte bei der initialen Implementierung bedacht werden, um später keine Performanceprobleme zu bekommen.

### 6. **Technische Herausforderungen**:
   - **Synchrone vs. asynchrone Operationen**: Da Vue.js oft mit asynchronen Datenquellen (wie APIs) arbeitet, musst du sicherstellen, dass das Canvas nicht vorzeitig initialisiert oder verwendet wird, bevor die Daten vollständig geladen sind.
   - **Responsiveness**: Das Canvas muss so konfiguriert werden, dass es sich an unterschiedliche Bildschirmgrößen und -auflösungen anpasst, ohne dabei an Performance oder Funktionalität einzubüßen.
   - **Event Handling und State Management**: Der Zustand der Anwendung und die Behandlung von Ereignissen müssen sorgfältig synchronisiert werden, um eine reibungslose Benutzererfahrung zu gewährleisten. Insbesondere beim Umgang mit großen Mengen von Datenpunkten und deren Visualisierung.

### Fazit:
Die Integration von Canvas in eine Vue.js-Anwendung ist machbar, erfordert jedoch eine sorgfältige Handhabung der reaktiven Datenbindung und Event-Handling. Es ist wichtig, eine klare Trennung zwischen der Visualisierungslogik und der Datenlogik zu haben, um die Anwendung wartbar und performant zu halten.
