// server.js
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());
app.use(express.static("public")); // Serve la cartella "public" come risorse statiche

// Libri di prova
let libri = [
  {
    codice: uuidv4(),
    nome: "Il Signore degli Anelli",
    descrizione: "Un classico fantasy di J.R.R. Tolkien",
    quantita: 10,
    prezzo: 15.99,
    autore: "J.R.R. Tolkien",
  },
  {
    codice: uuidv4(),
    nome: "1984",
    descrizione: "Un romanzo distopico di George Orwell",
    quantita: 5,
    prezzo: 12.99,
    autore: "George Orwell",
  },
];

// API per ottenere tutti i libri
app.get("/api/libri", (req, res) => {
  res.json(libri);
});

// API per ottenere un libro tramite codice
app.get("/api/libri/:codice", (req, res) => {
  const libro = libri.find((l) => l.codice === req.params.codice);
  libro ? res.json(libro) : res.status(404).send("Libro non trovato");
});

// API per aggiungere un nuovo libro
app.post("/api/libri", (req, res) => {
  const { nome, descrizione, quantita, prezzo, autore } = req.body;
  const nuovoLibro = {
    codice: uuidv4(),
    nome,
    descrizione,
    quantita,
    prezzo,
    autore,
  };
  libri.push(nuovoLibro);
  res.status(201).json(nuovoLibro);
});

// API per eliminare un libro
app.delete("/api/libri/:codice", (req, res) => {
  libri = libri.filter((l) => l.codice !== req.params.codice);
  res.status(204).send();
});

// API per incrementare la quantità
app.get("/api/libri/:codice/incrementa", (req, res) => {
  const libro = libri.find((l) => l.codice === req.params.codice);
  if (libro) {
    libro.quantita += 1;
    res.json(libro);
  } else {
    res.status(404).send("Libro non trovato");
  }
});

// API per decrementare la quantità
app.get("/api/libri/:codice/decrementa", (req, res) => {
  const libro = libri.find((l) => l.codice === req.params.codice);
  if (libro && libro.quantita > 0) {
    libro.quantita -= 1;
    res.json(libro);
  } else {
    res.status(404).send("Libro non trovato o quantità non disponibile");
  }
});

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});

// Funzione per chiudere il server
const closeServer = () => {
  server.close();
};

module.exports = { app, closeServer }; // Esportiamo app e closeServer