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
        <button onclick="this.parentElement.remove()">X</button>
    `;
    
    // Erlaubt das Durchstreichen beim Anklicken
    li.addEventListener("click", function(e) {
        if(e.target.tagName !== 'BUTTON') {
            this.classList.toggle("completed");
        }
    });

    ul.appendChild(li);
    input.value = ""; // Eingabefeld wieder leeren
}

// Funktion, um das Wetter für Dortmund ohne API-Key zu laden
function fetchWeather() {
    // Die genauen Koordinaten für Dortmund (Breitengrad & Längengrad)
    const lat = 51.5136;
    const lon = 7.4653;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code&timezone=Europe%2FBerlin`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Netzwerk-Fehler");
            }
            return response.json();
        })
        .then(data => {
            // Stadtname manuell setzen, da Open-Meteo nur Koordinaten liefert
            document.getElementById("wetter-stadt").innerText = "Dortmund";
            
            // Temperatur eintragen
            const temp = Math.round(data.current.temperature_2m);
            document.getElementById("wetter-temp").innerText = `${temp} °C`;
            
            // Wetter-Code in Text umwandeln
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

// Die Funktion sofort ausführen
fetchWeather();