import React, { useState, useEffect } from "react";
import Form from "./form";
import Filter from "./filter";
import phoneBook from "./services/phoneBook";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: 9999999 },
  ]);

  const [filteredPersons, setFilteredPersons] = useState([{ name: "" }]);

  useEffect(() => {
    console.log("effect");
    phoneBook.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const addPerson = (event) => {
    const inlist = persons.filter((item) => item.name === newName);

    if (inlist.length > 0) {
      alert(`${newName} already in list`);
    } else {
      setPersons([...persons, { name: newName, number: newNumber }]);
      phoneBook
        .addPerson({ name: newName, number: newNumber })
        .then((result) => {
          setSuccessMessage(result.status);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        });
    }

    event.preventDefault();
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilteredChange = (event) => {
    setNewFilter(event.target.value);
    setFilteredPersons(persons.filter((item) => item.name.includes(newFilter)));
  };

  const handleDelete = (id) => {
    phoneBook.deleteRecord(id).then((resp) => {
      phoneBook.getAll().then((response) => {
        setPersons(response.data);
      });
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilteredChange={handleFilteredChange} />
      <Form
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Notification message={successMessage} />
      <ul>
        {persons.map((person) => (
          <li className="phone-number" key={person.id}>
            {person.name + " " + person.number}{" "}
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </li>
        ))}
      </ul>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>{person.name + " " + person.number} </li>
        ))}
      </ul>
    </div>
  );
};

const Notification = ({ message }) => {
  if (!message) {
    return null;
  }

  return <div className="success" >{message}</div>;
};

export default App;
