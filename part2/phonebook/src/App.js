import React, { useEffect, useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsToCompare, setPersonsToCompare] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [msgType, setMsgType] = useState('')

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersonsToCompare(initialPersons)
      setPersons(initialPersons)
    })
  }, [])

  useEffect(() => {
    setPersons(personsToCompare)
  }, [personsToCompare])

  const addPerson = (event) => {
    event.preventDefault()

    const personExists = persons.filter((person) => person.name === newName)

    if (personExists.length > 0) {
      const updateOrder = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one ?`
      )
      if (updateOrder) {
        const updatedPerson = {
          ...personExists[0],
          number: newNumber,
        }
        personService
          .update(updatedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersonsToCompare(
              personsToCompare.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            )

            setMessage(`Changed ${returnedPerson.name} number`)
            setMsgType('success')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      personService.create(newPerson).then((returnedPerson) => {
        setPersonsToCompare(personsToCompare.concat(returnedPerson))

        setMessage(`Added ${newPerson.name}`)
        setMsgType('success')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deletePerson = (id, name) => () => {
    const deleteOrder = window.confirm(`Delete ${name}?`)
    if (deleteOrder) {
      personService
        .remove(id)
        .then(() => {
          setPersonsToCompare(
            personsToCompare.filter((person) => person.id !== id)
          )
        })
        .catch(() => {
          setMessage(
            `Information of ${name} has already been removed from the server`
          )
          setMsgType('error')

          setPersonsToCompare(
            personsToCompare.filter((person) => person.id !== id)
          )

          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    // regex case insensitive
    const regex = new RegExp(event.target.value, 'i')
    const filteredPersons = personsToCompare.filter((person) =>
      person.name.match(regex)
    )
    setPersons(filteredPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} msgType={msgType} />
      <Filter handleFilterChange={handleFilterChange} />
      <h2>Add a new person</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Person persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
