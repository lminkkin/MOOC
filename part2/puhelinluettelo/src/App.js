import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ notificationMessage, setNotificationMessage] = useState(null)
  const [ notificationType, setNotificationType] = useState(null)

  useEffect (() => {
    personService
      .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
          })  
  },  [])

  const changeNotification = ( type, message ) => {
    setNotificationType(type)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      
    }
    if (newName === ('')) {
      changeNotification('error', 'You must include a name')

    } else if (persons.find(person => person.name === newName)) {
        changeNotification('error', `${newName} is already added to phonebook`)

    }
      else {

        personService
          .create(personObject)
          .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              changeNotification('success', `Added ${personObject.name}`)
              setNewName('')
              setNewNumber('')
          })

  }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)

  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete person from phonebook?')) {
      personService
        .remove(id)
        changeNotification('success', `Removed ${persons.find(person => person.id === id).name}`)
      setPersons(persons.filter(person => person.id !==id ))
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={notificationType} message={notificationMessage}/>
      <h3>Add a new person</h3>
      <PersonForm newName={newName}
                  newNumber={newNumber}
                  handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange}
                  addPerson={addPerson}/>
      <h2>Numbers</h2>
      <div>
        <PersonList persons={persons} handleDelete={handleDelete} />
      </div>
      
    </div>
  )

}

export default App