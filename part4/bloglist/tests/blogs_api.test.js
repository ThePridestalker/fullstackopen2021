const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../tests/test_helper')

const api = supertest(app)

let testUser

beforeAll(async () => {
  const newUserCredentials = {
    username: 'TestUser',
    password: 'testingpassword',
    name: 'AxelTest'
  }

  const newUserLoginCredentials = {
    username: 'TestUser',
    password: 'testingpassword'
  }

  // creates the TestUser
  const newTestUserRequest = await api.post('/api/users')
    .send(newUserCredentials)
    .expect(201)

  // perform a login to get the user token
  const loginRequest = await api
    .post('/api/login')
    .send(newUserLoginCredentials)
    .expect(200)

  testUser = {
    token: loginRequest.body.token,
    id: newTestUserRequest.body.id
  }
})

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test('correct amount of blog posts are returned in JSON format', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('making an HTTP POST request to the /api/blogs url successfully creates a new blog post', async () => {
  const newBlog = {
    title: 'test3 blog',
    author: 'Axel',
    url: 'www.thiscouldbeablogurl.com',
    likes: 42
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${testUser.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length + 1)
})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    title: 'test CON TOKEN blog',
    author: 'Axel',
    url: 'www.thiscouldbeablogurl.com'
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${testUser.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
  const newBlog = {
    author: 'Axel',
    likes: 42
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${testUser.token}`)
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('adding a blog fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
  const newBlog = {
    title: 'test NO TOKEN blog',
    author: 'Axel',
    url: 'www.thiscouldbeablogurl.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

afterAll(async () => {
  await User.findByIdAndDelete(testUser.id)
  mongoose.connection.close()
})
