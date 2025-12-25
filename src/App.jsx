import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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
      {persons.map((person) => (
        <div>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
