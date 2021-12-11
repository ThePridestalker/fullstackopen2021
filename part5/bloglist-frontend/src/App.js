import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const createNew = () => (
    <form onSubmit={handleCreateBlog}>
      <div>
        title:
        <input
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={url}
          name='Url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )

  const blogList = () => (
    <div>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button> </p>
      {createNew()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await loginService.login({ username, password })
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
    window.localStorage.setItem(
      'loggedBloglistUser', JSON.stringify(user)
    )
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    window.location.reload()
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    setTitle('')
    setUrl('')
    setAuthor('')

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    const blogSaved = await blogService.create(newBlog)
    setBlogs(() => blogs.concat(blogSaved))
  }

  return (
    <div>
      <h2>blogs</h2>
      {user === null
        ? loginForm()
        : blogList()}
    </div>
  )
}

export default App
