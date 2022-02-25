import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterAnecdotes: (_state, action) => {
      return action.payload
    }
  }
})

export const { filterAnecdotes } = filterSlice.actions
export default filterSlice.reducer
