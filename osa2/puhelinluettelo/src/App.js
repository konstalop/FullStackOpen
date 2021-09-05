import React, { useState, useEffect } from 'react'
import Contact from './components/Contact'
import Filter from './components/Filter'
import AddContact from './components/AddContact'
import personsService from './services/personsService'



const App = () => {
  const [ persons, setPersons] = useState([  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber]= useState('')
  const [ filter, setNewFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState('error happened')

  //pulling data from json server
  useEffect(() => {
    personsService.getAll()
    .then(response => {
      setPersons(response.data)   
    })
  }, [])


  //handling the adding and editing of contacts
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }      
    if (persons.some(person => person.name === newName)) {
       if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
         const personModified = persons.find(person => person.name === newName)
         console.log(persons)
          personsService.update(personModified.id, nameObject)
           .then(response => {
             setPersons(persons.map(person => person.id !== personModified.id ? person : response.data))
           }).catch(error => {
             setErrorMessage('Contact was already removed from the server!')
             setTimeout(() => {
               setErrorMessage(null)
             }, 5000)
             })
           setNewName('')
           setNewNumber('')
          event.preventDefault()
       }
       event.preventDefault()
    } else {
      personsService
        .create(nameObject)
        .then(response =>{
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')    
        }
          )
    }  
  }

  const filterContacts = persons.filter(person => person.name.includes(filter))

   //handle the new change on name field
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

   //handle the new change on number field
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)

  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      
      <h2>Add a new contact</h2>
      <AddContact addName={addName} newName={newName} handleNameChange={handleNameChange}
       newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>

      <div>
      <ul>
        {filterContacts.map(person =>
          <Contact key={person.id} person={person} />
          )}
      </ul>
      </div>
    </div>
  )

}

export default App