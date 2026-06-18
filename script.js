// Funktion, um das Wetter für Dortmund ohne API-Key zu laden
function fetchWeather() {
    const lat = 51.5136;
    const lon = 7.4653;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code&timezone=Europe%2FBerlin`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Netzwerk-Fehler");
            return response.json();
        })
        .then(data => {
            document.getElementById("wetter-stadt").innerText = "Dortmund";
            const temp = Math.round(data.current.temperature_2m);
            document.getElementById("wetter-temp").innerText = `${temp} °C`;
            
            const code = data.current.weather_code;
            let beschreibung = "Klarer Himmel";
            if (code >= 1 && code <= 3) beschreibung = "Leicht bewölkt";
            else if (code >= 45 && code <= 48) beschreibung = "Nebelig";
            else if (code >= 51 && code <= 67) beschreibung = "Regen";
            else if (code >= 71 && code <= 77) beschreibung = "Schnee";
            else if (code >= 80 && code <= 82) beschreibung = "Regenschauer";
            else if (code >= 95) beschreibung = "Gewitter";
            
            document.getElementById("wetter-beschreibung").innerText = beschreibung;
        })
        .catch(error => {
            console.error("Fehler:", error);
            document.getElementById("wetter-beschreibung").innerText = "Fehler beim Laden!";
        });
}

// Funktion, um aktuelle News zu laden
function fetchNews() {
    const url = "https://api.spaceflightnewsapi.net/v4/articles/?limit=3";

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("News konnten nicht geladen werden");
            return response.json();
        })
        .then(data => {
            const newsListe = document.getElementById("news-liste");
            newsListe.innerHTML = "";

            data.results.forEach(artikel => {
                let li = document.createElement("li");
                li.innerHTML = `<a href="${artikel.url}" target="_blank">${artikel.title}</a>`;
                newsListe.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Fehler:", error);
            document.getElementById("news-liste").innerHTML = "<li>Fehler beim Laden der News!</li>";
        });
}

// Hilfsfunktion: Alle aktuellen To-Dos im Browser speichern
function saveTodos() {
    let todos = [];
    let liElements = document.querySelectorAll("#todo-list li");
    
    liElements.forEach(li => {
        todos.push({
            text: li.querySelector("span").innerText,
            completed: li.classList.contains("completed")
        });
    });
    
    localStorage.setItem("dashboardTodos", JSON.stringify(todos));
}

// Hilfsfunktion: Gespeicherte To-Dos beim Laden der Seite wieder anzeigen
function loadTodos() {
    let savedTodos = localStorage.getItem("dashboardTodos");
    if (!savedTodos) return;
    
    let todos = JSON.parse(savedTodos);
    let ul = document.getElementById("todo-list");
    ul.innerHTML = ""; // Vorher leeren
    
    todos.forEach(todo => {
        let li = document.createElement("li");
        if (todo.completed) {
            li.classList.add("completed");
        }
        
        li.innerHTML = `
            <span>${todo.text}</span>
            <button onclick="this.parentElement.remove(); saveTodos();">X</button>
        `;
        
        li.addEventListener("click", function(e) {
            if (e.target.tagName !== 'BUTTON') {
                this.classList.toggle("completed");
                saveTodos();
            }
        });
        
        ul.appendChild(li);
    });
}

// Funktion, um ein neues To-Do hinzuzufügen
function addTodo() {
    let input = document.getElementById("todo-input");
    let text = input.value.trim();
    
    if (text === "") {
        alert("Bitte schreib erst etwas in das Feld!");
        return;
    }

    let ul = document.getElementById("todo-list");
    let li = document.createElement("li");
    
    li.innerHTML = `
        <span>${text}</span>
        <button onclick="this.parentElement.remove(); saveTodos();">X</button>
    `;
    
    li.addEventListener("click", function(e) {
        if(e.target.tagName !== 'BUTTON') {
            this.classList.toggle("completed");
            saveTodos();
        }
    });

    ul.appendChild(li);
    input.value = "";
    
    saveTodos(); // Direkt im Speicher sichern
}

// Alles starten beim Laden der Seite
fetchWeather();
fetchNews();
loadTodos();

// Funktion zum Umschalten des Dark Modes
function toggleDarkMode() {
    const body = document.body;
    const btn = document.getElementById("theme-toggle");
    
    // Klasse "dark-mode" hinzufügen oder entfernen
    body.classList.toggle("dark-mode");
    
    // Zustand im localStorage speichern
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        btn.innerText = "☀️ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        btn.innerText = "🌙 Dark Mode";
    }
}

// Prüfen, welcher Modus beim Laden der Seite aktiv sein soll
function checkTheme() {
    const savedTheme = localStorage.getItem("theme");
    const body = document.body;
    const btn = document.getElementById("theme-toggle");
    
    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        if (btn) btn.innerText = "☀️ Light Mode";
    }
}

// Die Theme-Prüfung direkt beim Start ausführen
checkTheme();

// Funktion für Uhrzeit, Datum und dynamische Begrüßung
function updateClock() {
    const jetzt = new Date();
    
    // 1. Uhrzeit formatieren (HH:MM:SS)
    const stunden = String(jetzt.getHours()).padStart(2, '0');
    const minuten = String(jetzt.getMinutes()).padStart(2, '0');
    const sekunden = String(jetzt.getSeconds()).padStart(2, '0');
    document.getElementById("uhrzeit").innerText = `${stunden}:${minuten}:${sekunden}`;
    
    // 2. Datum formatieren (z.B. "Freitag, 19. Juni")
    const optionen = { weekday: 'long', day: 'numeric', month: 'long' };
    document.getElementById("datum").innerText = jetzt.toLocaleDateString('de-DE', optionen);
    
    // 3. Dynamische Begrüßung je nach Uhrzeit
    const aktuelleStunde = jetzt.getHours();
    let gruss = "Hallo, Emre!";
    
    if (aktuelleStunde >= 5 && aktuelleStunde < 11) {
        gruss = "Guten Morgen, Emre! ☕";
    } else if (aktuelleStunde >= 11 && aktuelleStunde < 18) {
        gruss = "Guten Tag, Emre! ☀️";
    } else {
        gruss = "Guten Abend, Emre! 🌙";
    }
    
    document.getElementById("begruessung").innerText = gruss;
}

// Die Uhr sofort starten und ab dann jede Sekunde (1000ms) aktualisieren
updateClock();
setInterval(updateClock, 1000);