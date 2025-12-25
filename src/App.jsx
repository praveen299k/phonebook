import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChagne = (e) => {
    setNewName(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const personExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (personExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const person = { name: newName };
    setPersons(persons.concat(person));
    setNewName("");
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div>{person.name}</div>
      ))}
    </div>
  );
};

export default App;
