import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './form'
import Filter from './filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',"number" :9999999 }
  ]) 

  const [filteredPersons, setFilteredPersons] = useState([
    { name: '' }
  ]) 

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event)=> {
    const inlist = persons.filter(item => item.name === newName)
    console.log(inlist)
    if(inlist.length > 0){
      alert(`${newName} already in list`)
    }else{
      setPersons([...persons,{"name":newName ,"number":newNumber}])
    }
    
    event.preventDefault()
    setNewName('')
    setNewNumber('')
  } 

  const handleNameChange = (event)=> {
    setNewName(event.target.value)
  } 

  const handleNumberChange = (event)=> {
    setNewNumber(event.target.value)
  } 

  const handleFilteredChange = (event)=> {
    setNewFilter(event.target.value)
    setFilteredPersons(persons.filter(item => item.name.includes(newFilter)))
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilteredChange={handleFilteredChange}/>
      <Form addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person,i) => <li key={i}>{person.name + " " + person.number}</li>)}
     </ul>
      <ul>
        {filteredPersons.map((person,i) => <li key={i}>{person.name + " " + person.number}</li>)}
      </ul>  
     </div>
  )
}

export default App