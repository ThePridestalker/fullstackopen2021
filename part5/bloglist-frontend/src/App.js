import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  const blogFormRef = useRef()

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
    <form id='login-form' onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type='submit'>login</button>
    </form>
  )

  const createNew = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm handleCreateBlog={handleCreateBlog} />
    </Togglable>
  )

  const blogList = () => {
    // sorted from higher likes to lower likes
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button> </p>
        {createNew()}
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} handleUpdateBlog={handleUpdateBlog} handleDeleteBlog={handleDeleteBlog} />
        )}
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
    } catch (exception) {
      setNotificationMessage('wrong username or password')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    window.location.reload()
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()

      const blogSaved = await blogService.create(blogObject)
      setBlogs(() => blogs.concat(blogSaved))
      setNotificationMessage(`a new blog ${blogSaved.title} by ${blogSaved.author} added`)
      setNotificationType('success')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setNotificationMessage(exception.response.data)
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      console.log(exception.response.data)
    }
  }

  const handleUpdateBlog = async (blogId, blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogId, blogObject)
      setBlogs(blogs.map(blog => {
        return blog.id === updatedBlog.id ? updatedBlog : blog
      }))
    } catch (exception) {
      console.log(exception.response.data)
    }
  }

  const handleDeleteBlog = async (blogId) => {
    try {
      setBlogs(blogs.filter(blog => blog.id !== blogId))
    } catch (exception) {
      console.log(exception.response.data)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} messageType={notificationType} />
      {user === null
        ? loginForm()
        : blogList()}
    </div>
  )
}

export default App
