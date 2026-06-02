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