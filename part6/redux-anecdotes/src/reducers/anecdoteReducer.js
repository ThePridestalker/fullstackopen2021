import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    increaseVoteAnecdote: (state, action) => {
      const updatedAnecdote = action.payload

      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )
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
export const { increaseVoteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdotes = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdotes))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch(increaseVoteAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
