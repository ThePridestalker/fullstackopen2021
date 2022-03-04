import { useState } from 'react'
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import Menu from './components/Menu'
import Footer from './components/Footer'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import About from './components/About'
import Anecdote from './components/Anecdote'

const App = () => {
  const navigate = useNavigate()

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Number((Math.random() * 10000).toFixed(0))
    setAnecdotes(anecdotes.concat(anecdote))
    // replace: true replaces the history last component by the new one
    // we get redirected to, so if we were in the component CreateNew
    // and navigate to the Anecdotes one with repace: true, we wont be
    // able to press the browser back button and get back to CreateNew,
    // as it has gotten replaced in the history.

    // navigate("/", { replace: true })
    navigate('/')
    setNotification(`A new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (
    <>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />

        {notification.length > 0 &&
          <div>
            {notification}
          </div>}

        <Routes>
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path='/create' element={<CreateNew addNew={addNew} />} />
          <Route path='/about' element={<About />} />
          <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
        </Routes>

        <Footer />
      </div>

    </>
  )
}

export default App
