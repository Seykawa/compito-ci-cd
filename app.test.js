// app.test.js
const request = require("supertest");
const { app, closeServer } = require("./server"); // Assicurati che "server.js" esponga solo l'app

describe("Test API gestione libri", () => {
  afterAll(() => {
    closeServer(); // Chiudiamo il server dopo tutti i test
  });

  it("GET /api/libri - dovrebbe restituire un array di libri", async () => {
    const res = await request(app).get("/api/libri");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true); 
  });

  it("POST /api/libri - dovrebbe aggiungere un nuovo libro", async () => {
    const nuovoLibro = {
      nome: "Il libro",
      descrizione: "Descrizione del libro",
      quantita: 9,
      prezzo: 19.99,
      autore: "Alberto Gialli",
    };

    const res = await request(app).post("/api/libri").send(nuovoLibro);
    expect(res.statusCode).toEqual(201);
    expect(res.body.nome).toBe(nuovoLibro.nome);
    expect(res.body.quantita).toBe(nuovoLibro.quantita);
  });
});