const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash
  })

  if (body.password.length < 3) {
    response.status(400).json('password must be at least 3 characters long')
  } else {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
})

module.exports = usersRouter
