import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      // state.push() is valid in reduxToolkit
      state.push(action.payload)
      // return [...state, newAnecdote]
    },
    voteAnecdote: (state, action) => {
      const id = action.payload

      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      ).sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote (state, action) {
      state.push(action.payload)
    },
    setAnecdotes (_state, action) {
      return action.payload
    }
  }
})
export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
