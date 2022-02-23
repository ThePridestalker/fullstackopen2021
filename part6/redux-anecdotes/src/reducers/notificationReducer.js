import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (_state, action) => {
      return action.payload
    },
    dismissNotification: () => {
      return null
    }
  }
})

export const { setNotification, dismissNotification } = notificationSlice.actions

export const newNotification = (notificationText, displayTime) => {
  return async (dispatch) => {
    dispatch(setNotification(notificationText))

    setTimeout(() => {
      dispatch(dismissNotification())
    }, displayTime * 1000)
  }
}

export default notificationSlice.reducer
