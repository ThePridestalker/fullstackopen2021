const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'test blog',
    author: 'Axel',
    url: 'www.thiscouldbeablogurl.com',
    likes: 42,
    id: '6175d049dd7b2363892e3bfd'
  },
  {
    title: 'test2 blog',
    author: 'Axel',
    url: 'www.thiscouldbeablogurl.com',
    likes: 42,
    id: '6175d7b73e6ed20cda966f09'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}
