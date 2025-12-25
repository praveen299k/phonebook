import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [nametoSearch, setNameToSearch] = useState("");

  const personsToShow =
    nametoSearch.trim("") === ""
      ? persons
      : persons.filter((person) => {
          return person.name
            .toLowerCase()
            .includes(nametoSearch.toLowerCase().trim(""));
        });

  const handleFilterPhonebook = (e) => {
    setNameToSearch(e.target.value);
  };

  const handleNameChagne = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const personExists = persons.find((person) => {
      return (
        person.name.toLowerCase() === newName.toLowerCase() ||
        person.number === newNumber
      );
    });
    if (personExists) {
      alert(`name or number is already added to phonebook`);
      return;
    }
    const person = { name: newName, number: newNumber };
    setPersons(persons.concat(person));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter phonebook with{" "}
        <input
          type="text"
          value={nametoSearch}
          onChange={handleFilterPhonebook}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name:{" "}
          <input type="text" value={newName} onChange={handleNameChagne} />
        </div>
        <div>
          number <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
