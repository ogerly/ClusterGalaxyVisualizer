const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let clusters = []; // Hier wird die generierte Cluster-Daten gespeichert
let scale = 1; // Für Zoom
let offsetX = 0, offsetY = 0; // Für Pan
let spaceWidth, spaceHeight; // Dimensionen des Bereichs

const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('closeBtn');
const pointList = document.getElementById('pointList');
const searchInput = document.getElementById('searchInput');
const suggestions = document.getElementById('suggestions');
const clusterList = document.getElementById('clusterList');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Vergrößere die Dimensionen des Bereichs
    spaceWidth = canvas.width * 3;
    spaceHeight = canvas.height * 3;
}

function generateClusters() {
    const clusterCount = 200;
    const baseSizeScale = 30;
    const clusterSpacing = 500; // Weiter auseinander platzierte Cluster
    const clusterNames = generateClusterNames(clusterCount);

    clusters = []; // Reset the cluster data

    for (let i = 0; i < clusterCount; i++) {
        const activeStars = Math.floor(Math.random() * 5) + 1;
        const totalStars = Math.floor(Math.random() * 5) + 5;
        const clusterSize = baseSizeScale * totalStars * (activeStars / 5);
        const baseX = (Math.random() * spaceWidth) + (Math.random() - 0.5) * clusterSpacing;
        const baseY = (Math.random() * spaceHeight) + (Math.random() - 0.5) * clusterSpacing;
        let points = [];
        
        for (let j = 0; j < totalStars; j++) {
            points.push({
                x: baseX + (Math.random() - 0.5) * clusterSize,
                y: baseY + (Math.random() - 0.5) * clusterSize,
                active: j < activeStars
            });
        }
        
        clusters.push({
            name: clusterNames[i],
            points: points,
            activeStars: activeStars,
            centerX: baseX,
            centerY: baseY,
            originalPoints: JSON.parse(JSON.stringify(points)) // Speichern der Originalpunkte
        });
    }

    populateClusterList(); // Füllt die Cluster-Liste nach der Generierung
}

function generateClusterNames(count) {
    const names = [];
    for (let i = 1; i <= count; i++) {
        names.push(`Cluster-${i}`);
    }
    return names;
}

function populateClusterList() {
    clusterList.innerHTML = '';
    clusters.forEach(cluster => {
        const listItem = document.createElement('li');
        listItem.textContent = cluster.name;
        listItem.addEventListener('click', () => zoomToCluster(cluster));
        clusterList.appendChild(listItem);
    });
}

function drawClusters() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);

    for (const cluster of clusters) {
        const points = cluster.originalPoints; // Verwende die gespeicherten Originalpunkte

        // Zeichne das Sternbild des Clusters
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 0.5;
        ctx.beginPath();

        for (let i = 0; i < points.length - 1; i++) {
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[i + 1].x, points[i + 1].y);
        }

        ctx.stroke();

        // Zeichnen der Sterne
        for (let i = 0; i < points.length; i++) {
            const size = points[i].active ? 5 : 2;
            ctx.fillStyle = points[i].active ? 'yellow' : 'gray';
            ctx.beginPath();
            ctx.arc(points[i].x, points[i].y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    ctx.restore();
}

function onZoom(event) {
    const zoomSpeed = 0.1;
    const direction = event.deltaY > 0 ? -1 : 1;
    const zoomFactor = (1 + zoomSpeed * direction);

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    offsetX -= mouseX / scale - mouseX / (scale * zoomFactor);
    offsetY -= mouseY / scale - mouseY / (scale * zoomFactor);

    scale *= zoomFactor;
    drawCanvas(); // Zeichne die Cluster bei jeder Zoomänderung
}

function onPan(event) {
    offsetX += event.movementX;
    offsetY += event.movementY;
    drawCanvas(); // Zeichne die Cluster bei jeder Verschiebung neu
}

function onMouseDown(event) {
    canvas.addEventListener('mousemove', onPan);
}

function onMouseUp(event) {
    canvas.removeEventListener('mousemove', onPan);
}

function onClick(event) {
    const mouseX = (event.clientX - offsetX) / scale;
    const mouseY = (event.clientY - offsetY) / scale;

    let clickedPoint = null;
    let clickedCluster = null;

    // Prüfen, ob auf einen aktiven Punkt geklickt wurde
    for (const cluster of clusters) {
        for (const point of cluster.points) {
            const distance = Math.sqrt(Math.pow(point.x - mouseX, 2) + Math.pow(point.y - mouseY, 2));
            if (distance < 5 && point.active) {
                clickedPoint = point;
                clickedCluster = cluster;
                break;
            }
        }
        if (clickedPoint) break;
    }

    if (clickedPoint) {
        // Zeige nur die Informationen des angeklickten Punktes an
        showPointDetails(clickedPoint, clickedCluster);
    } else {
        // Prüfen, ob in der Nähe eines Clusters, aber nicht auf einem aktiven Punkt geklickt wurde
        for (const cluster of clusters) {
            if (isInsideCluster(mouseX, mouseY, cluster)) {
                clickedCluster = cluster;
                break;
            }
        }

        if (clickedCluster) {
            // Zeige alle aktiven Punkte des Clusters an
            showClusterDetails(clickedCluster);
        }
    }
}

function isInsideCluster(x, y, cluster) {
    for (const point of cluster.points) {
        const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
        if (distance < 20) { // 20px Toleranz für das Klicken auf den Clusterbereich
            return true;
        }
    }
    return false;
}

function showPointDetails(point, cluster) {
    pointList.innerHTML = ''; // Leere die aktuelle Liste
    const listItem = document.createElement('li');
    listItem.textContent = `Cluster: ${cluster.name}`;
    pointList.appendChild(listItem);
    const pointItem = document.createElement('li');
    pointItem.innerHTML = `<strong>Punkt:</strong> (${Math.round(point.x)}, ${Math.round(point.y)})`;
    pointList.appendChild(pointItem);
    sidebar.classList.add('open');
}

function showClusterDetails(cluster) {
    pointList.innerHTML = ''; // Leere die aktuelle Liste
    const clusterItem = document.createElement('li');
    clusterItem.textContent = `Cluster: ${cluster.name}`;
    pointList.appendChild(clusterItem);
    cluster.points.forEach((point, index) => {
        if (point.active) {
            const listItem = document.createElement('li');
            listItem.textContent = `Punkt ${index + 1}: (${Math.round(point.x)}, ${Math.round(point.y)})`;
            pointList.appendChild(listItem);
        }
    });
    sidebar.classList.add('open');
}

function onSearchInput(event) {
    const query = event.target.value.toLowerCase();
    const matches = clusters.filter(cluster => cluster.name.toLowerCase().includes(query));
    suggestions.innerHTML = '';
    matches.forEach(cluster => {
        const suggestionItem = document.createElement('li');
        suggestionItem.textContent = cluster.name;
        suggestionItem.addEventListener('click', () => zoomToCluster(cluster));
        suggestions.appendChild(suggestionItem);
    });
}

function zoomToCluster(cluster) {
    scale = 2; // Setze einen Zoomlevel
    offsetX = canvas.width / 2 - cluster.centerX * scale;
    offsetY = canvas.height / 2 - cluster.centerY * scale;
    drawCanvas();
    searchInput.value = ''; // Leere das Suchfeld
    suggestions.innerHTML = ''; // Leere die Vorschläge
}

closeBtn.addEventListener('click', function() {
    sidebar.classList.remove('open'); // Schließe die Sidebar
});

searchInput.addEventListener('input', onSearchInput);

resizeCanvas();
generateClusters();
drawClusters();

window.addEventListener('resize', () => {
    resizeCanvas();
    drawClusters(); // Keine Neugenerierung der Daten
});

canvas.addEventListener('wheel', onZoom);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('click', onClick);

// Diese Funktion stellt sicher, dass die Cluster nur einmal gezeichnet werden
function drawCanvas() {
    drawClusters();
}
