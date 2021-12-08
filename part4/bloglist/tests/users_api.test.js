const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('Invalid users are not created', () => {
  test('user cant be duplicated', async () => {
    const firstNewUser = {
      username: 'Axelinho',
      password: 'testpassword',
      name: 'Axel'
    }

    // inserts the first user into the DB
    await api.post('/api/users').send(firstNewUser)

    const newUser = {
      username: 'Axelinho',
      password: 'testpassword',
      name: 'Axel'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('password cant be shorter than 3 characters long', async () => {
    const newUser = {
      username: 'Tom',
      password: 't',
      name: 'Thomas'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('name must be at least 3 characters long', async () => {
    const newUser = {
      username: 'Tom',
      password: 't',
      name: 'Thomas'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
