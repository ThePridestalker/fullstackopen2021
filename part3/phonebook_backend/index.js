require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body),
    ].join(' ')
  })
)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/info', (request, response) => {
  const currentDate = new Date()

  response.send(`
                <p>Phonebook has info for ${persons.length} people</p>
                <p>${currentDate}</p>
                `)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((result) => {
    res.json(result)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const person = request.body
  const randomNumber = Math.floor(Math.random() * 100) + 1

  // The name or number is missing
  if (!person.name || !person.number) {
    return response.status(400).json({
      error: 'missing name or number',
    })
  }
  // The name already exists in the phonebook
  if (persons.find((p) => p.name === person.name)) {
    return response.status(400).json({
      error: 'name already exist',
    })
  }

  const newPerson = {
    id: randomNumber,
    name: person.name,
    number: person.number,
  }

  persons.push(newPerson)

  response.json(newPerson)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/persons`)
})
