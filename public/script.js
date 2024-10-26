// public/script.js

// Funzione per ottenere tutti i libri
async function getLibri() {
    const response = await fetch('/api/libri');
    const libri = await response.json();
    
    const libriDiv = document.getElementById("libri");
    libriDiv.innerHTML = ''; // Pulisce la lista

    libri.forEach(libro => {
        const libroElement = document.createElement("div");
        libroElement.innerHTML = `
            <strong>${libro.nome}</strong> - ${libro.descrizione} <br>
            Autore: ${libro.autore} <br>
            Quantità: ${libro.quantita} - Prezzo: €${libro.prezzo} <br>
            <button onclick="incrementaQuantita('${libro.codice}')">+1</button>
            <button onclick="decrementaQuantita('${libro.codice}')">-1</button>
            <button onclick="rimuoviLibro('${libro.codice}')">Rimuovi</button>
        `;
        libriDiv.appendChild(libroElement);
    });
}

// Funzione per aggiungere un libro
async function aggiungiLibro(event) {
    event.preventDefault(); // Previene il ricaricamento della pagina

    const nome = document.getElementById("nome").value;
    const descrizione = document.getElementById("descrizione").value;
    const quantita = parseInt(document.getElementById("quantita").value, 10);
    const prezzo = parseFloat(document.getElementById("prezzo").value);
    const autore = document.getElementById("autore").value;

    const response = await fetch('/api/libri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, descrizione, quantita, prezzo, autore })
    });

    if (response.ok) {
        document.getElementById("libroForm").reset(); // Reset del form
        getLibri(); // Aggiorna la lista dei libri
    } else {
        alert('Errore durante l\'aggiunta del libro');
    }
}

// Funzione per incrementare la quantità
async function incrementaQuantita(codice) {
    const response = await fetch(`/api/libri/${codice}/incrementa`);
    if (response.ok) getLibri();
}

// Funzione per decrementare la quantità
async function decrementaQuantita(codice) {
    const response = await fetch(`/api/libri/${codice}/decrementa`);
    if (response.ok) getLibri();
}

// Funzione per rimuovere un libro
async function rimuoviLibro(codice) {
    const response = await fetch(`/api/libri/${codice}`, {
        method: 'DELETE'
    });
    if (response.ok) getLibri();
}