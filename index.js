const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(morgan("tiny"));

morgan.token("body", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

// Configure Morgan to use the 'tiny' format and log request body for POST requests
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${
      persons.length
    } people <br/><br/> ${new Date()} </p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).json({ message: "No person found with id " + id });
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons/", (request, response) => {
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({ error: "name or number is missing" });
  }

  const flag = persons.some((person) => person.number === request.body.number);
  if (flag) {
    return response.status(400).json({ error: "number is already present" });
  }

  const person = {
    id: String(Math.floor(Math.random() * 2500) + persons.length),
    name: request.body.name,
    number: request.body.number,
  };

  persons = persons.concat(person);
  response.status(201).json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
