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

// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>')
// })

app.get('/api/info', (request, response, next) => {
  const currentDate = new Date()

  Person.find({})
    .then((result) => {
      response.send(`
                <p>Phonebook has info for ${result.length} people</p>
                <p>${currentDate}</p>
                `)
    })
    .catch((error) => next(error))
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((result) => {
      res.json(result)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Person.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name is missing',
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number is missing',
    })
  }

  Person.find({})
    .then((persons) => {
      // A person can have only 1 entry in the phonebook
      if (persons.some((person) => person.name === body.name)) {
        return response.status(400).json({
          error: 'name must be unique',
        })
      }

      const person = new Person({
        name: body.name,
        number: body.number,
      })

      person
        .save()
        .then((savedPerson) => {
          response.json(savedPerson)
        })
        .catch((error) => next(error))
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const id = request.params.id
  const person = {
    number: body.number,
  }

  Person.findByIdAndUpdate(id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/persons`)
})
