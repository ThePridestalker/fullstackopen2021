const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
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

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

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

app.get('/api/persons', (request, response) => {
  response.json(persons)
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/persons`)
})
