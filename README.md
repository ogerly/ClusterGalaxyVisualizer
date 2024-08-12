# ClusterGalaxyVisualizer
 

### Beschreibung:
**ClusterGalaxyVisualizer** ist eine interaktive Visualisierungsanwendung, die es ermöglicht, Cluster von Sternen auf einer Karte darzustellen. Die Anwendung bietet eine benutzerfreundliche Oberfläche mit einer Suchleiste und einer interaktiven Cluster-Liste, die es Benutzern ermöglicht, spezifische Cluster einfach zu finden und zu ihnen zu zoomen.

### Prototyp:
Ein funktionierender Prototyp der Anwendung zeigt die grundlegenden Funktionen wie das Anzeigen von Clustern, das Zoomen auf spezifische Cluster und die Anzeige von Cluster- und Punktdetails in einer Sidebar.


https://github.com/user-attachments/assets/865c22ba-5d93-466c-a862-794beaa32f12

![Bildschirmfoto vom 2024-08-12 10-13-06](https://github.com/user-attachments/assets/d8476395-689c-4a38-813c-aa5451c60496)
![Bildschirmfoto vom 2024-08-12 10-13-10](https://github.com/user-attachments/assets/f779cb9c-3852-423a-89e0-0533dfed88fc)

### Funktionsumfang:
1. **Interaktive Cluster-Visualisierung**:
   - Darstellung von 200 Clustern mit zufällig generierten Sternenpunkten.
   - Jeder Cluster hat eine eigene, unveränderliche Form, die beim Zoomen und Bewegen der Karte stabil bleibt.

2. **Suchfunktion**:
   - Eine Suchleiste ermöglicht es Benutzern, nach spezifischen Clustern zu suchen.
   - Autovervollständigung zeigt passende Cluster während der Eingabe an.

3. **Interaktive Cluster-Liste**:
   - Eine Liste der verfügbaren Cluster wird auf der linken Seite angezeigt.
   - Durch Klicken auf einen Listeneintrag wird zum entsprechenden Cluster gezoomt.

4. **Zoom- und Pan-Funktion**:
   - Benutzer können in die Karte hinein- und herauszoomen sowie die Karte verschieben, um verschiedene Bereiche der Cluster-Visualisierung zu erkunden.

5. **Sidebar mit Cluster-Details**:
   - Beim Klicken auf einen Punkt oder Cluster werden detaillierte Informationen in einer Sidebar angezeigt.
   - Die Sidebar zeigt entweder Informationen zu einem spezifischen Punkt oder zu allen aktiven Punkten eines Clusters.

6. **Responsive Canvas**:
   - Das Canvas passt sich automatisch an die Fenstergröße an und skaliert die Clusterdarstellung entsprechend.

### Repository-Struktur:
- **index.html**: Die Haupt-HTML-Datei, die die Struktur der Seite definiert.
- **styles.css**: Die CSS-Datei, die das Layout und das Design der Anwendung steuert.
- **script.js**: Die JavaScript-Datei, die die Logik für die Cluster-Visualisierung, die Suche und die Interaktion mit der Benutzeroberfläche enthält.

### Anleitungen zur Installation:
1. Klonen Sie das Repository: `git clone https://github.com/[YourUsername]/ClusterGalaxyVisualizer.git`
2. Öffnen Sie die `index.html`-Datei in einem Webbrowser.

### Live-Demo:
https://codepen.io/ogerly/pen/MWMEZNd




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

# Cluster-Visualisierung in eine Vue.js-Anwendung 

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


#Zoomstufen Konzepte

### Konzept der Zoomstufen und Cluster-Bündelung für eine bessere Benutzererfahrung

Das Konzept der Zoomstufen spielt eine zentrale Rolle bei der Visualisierung großer Mengen von Daten, insbesondere wenn es darum geht, Cluster von Objekten, wie z.B. Sterne oder thematische Gruppen, auf einer Karte darzustellen. Hier ist eine Erklärung, wie man mit Zoomstufen arbeiten kann, um ein optimales Benutzererlebnis zu bieten und die Daten effektiv zu filtern und darzustellen.

#### 1. **Grundidee der Zoomstufen**
- **Zoomstufen als Ebenen der Detailgenauigkeit**: Jede Zoomstufe repräsentiert eine unterschiedliche Ebene der Detailgenauigkeit. Auf höheren Zoomstufen (herangezoomt) werden mehr Details angezeigt, wie z.B. einzelne Punkte oder Untergruppen von Clustern. Auf niedrigeren Zoomstufen (herausgezoomt) wird eine aggregierte oder vereinfachte Ansicht gezeigt, um eine Überfrachtung der Karte zu vermeiden.
  
- **Fließende Übergänge**: Beim Wechsel zwischen den Zoomstufen sollten die Übergänge fließend sein. Das bedeutet, dass sich die Anzahl der sichtbaren Elemente proportional zur Zoomstufe ändert, ohne dass plötzliche Sprünge in der Darstellung auftreten.

#### 2. **Cluster-Bündelung nach Themen**
- **Gruppierung auf niedrigen Zoomstufen**: Bei niedrigen Zoomstufen, wenn der Benutzer weit herausgezoomt ist, können ähnliche Cluster zu größeren, übergeordneten Gruppen zusammengefasst werden. Diese Gruppen repräsentieren dann ein bestimmtes Thema oder eine Kategorie. So können zum Beispiel alle Cluster, die sich mit einem bestimmten Thema beschäftigen, zu einem einzigen "Supercluster" zusammengefasst werden.
  
- **Entfaltung auf höheren Zoomstufen**: Wenn der Benutzer weiter hineinzoomt, kann der Supercluster in seine einzelnen Untergruppen aufgeteilt werden, und schließlich können die einzelnen Punkte oder kleineren Cluster sichtbar werden. Dies bietet eine detailliertere Ansicht und erlaubt es dem Benutzer, spezifische Details zu untersuchen.

#### 3. **Visuelle Unterschiede zur Unterscheidung von Zoomstufen**
- **Skalierung und Farbgebung**: Um die verschiedenen Zoomstufen visuell hervorzuheben, können die Größen der Cluster und die Farben der Darstellung angepasst werden. Größere Supercluster auf niedrigen Zoomstufen können in gedeckteren Farben dargestellt werden, während kleinere, detailliertere Cluster auf höheren Zoomstufen in lebhafteren Farben erscheinen.

- **Icons und Symbole**: Auf niedrigen Zoomstufen können anstelle von vielen Punkten Icons oder Symbole verwendet werden, die das Thema des Clusters repräsentieren. Beim Hineinzoomen könnten diese Symbole dann in detaillierte Cluster oder Punkte übergehen.

#### 4. **Benutzerführung und -interaktion**
- **Zoomsteuerung und Fokus**: Benutzer sollten die Möglichkeit haben, gezielt auf bestimmte Bereiche der Karte zu zoomen. Dies kann durch Klicks auf Supercluster, durch Suchfunktionen oder durch Scrollen erreicht werden. Dabei sollte die Karte automatisch den Fokus auf den interessierenden Bereich verschieben und den Zoom entsprechend anpassen.

- **Optische Filterung**: Ein wichtiges Konzept ist die optische Filterung, bei der nur relevante Informationen auf einer bestimmten Zoomstufe angezeigt werden. Dies verhindert Überfrachtung und lenkt die Aufmerksamkeit des Benutzers auf wesentliche Informationen. Filterfunktionen könnten dynamisch aktiviert werden, abhängig von der Zoomstufe, um die Anzahl der sichtbaren Datenpunkte zu regulieren.

#### 5. **Technische Umsetzung**
- **Datenmanagement**: Die Daten für die verschiedenen Zoomstufen müssen effizient verwaltet werden. Dies kann durch verschiedene Techniken wie Progressive Loading (Daten werden nach Bedarf geladen) oder Caching (häufig benötigte Daten werden im Speicher gehalten) erreicht werden.

- **Leistung und Rendergeschwindigkeit**: Da die Zoomstufen in Echtzeit angepasst werden, ist die Performance entscheidend. Es sollten daher Techniken wie Level of Detail (LOD) eingesetzt werden, bei denen weniger detaillierte Modelle oder Daten bei niedrigen Zoomstufen verwendet werden, um die Rendergeschwindigkeit zu verbessern.

### Fazit
Das Konzept der Zoomstufen und der Cluster-Bündelung bietet eine effektive Methode, um große Mengen von Daten übersichtlich und interaktiv darzustellen. Durch die Anwendung dieser Konzepte können Benutzer tief in die Daten eintauchen, ohne sich von der Menge an Informationen überwältigt zu fühlen. Gleichzeitig wird eine optische Filterung implementiert, die sicherstellt, dass nur relevante Informationen in einer benutzerfreundlichen und ästhetisch ansprechenden Weise angezeigt werden.
