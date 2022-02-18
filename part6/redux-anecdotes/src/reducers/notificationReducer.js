import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    newNotification: (_state, action) => {
      return action.payload
    },
    dismissNotification: () => {
      return null
    }
  }
})

export const { newNotification, dismissNotification } = notificationSlice.actions
export default notificationSlice.reducer
