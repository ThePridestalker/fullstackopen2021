const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// const User = require('../models/user')
// const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  if (!blog.title || !blog.url) {
    response.status(400).json('title or url is missing')
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    response.status(201).json(savedBlog)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    id: request.params.id
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blogId = request.params.id

  const blog = await Blog.findById(blogId)

  if (blog) {
    if (user.id.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(blogId)
      response.status(204).end()
    } else {
      return response.status(401).json({ error: 'invalid user' })
    }
  } else {
    return response.status(404).json({ error: 'blog not found' })
  }
})

module.exports = blogsRouter
