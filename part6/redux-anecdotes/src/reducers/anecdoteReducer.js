import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
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
    // you can define action creators like this too
    appendAnecdote (state, action) {
      state.push(action.payload)
    },
    setAnecdotes (_state, action) {
      return action.payload
    }
  }
})
export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdotes = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdotes))
  }
}

export default anecdoteSlice.reducer
