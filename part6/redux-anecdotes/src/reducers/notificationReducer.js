import { createSlice } from '@reduxjs/toolkit'

let notificationTimeoutId = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification: (_state, action) => {
      if (notificationTimeoutId) {
        clearTimeout(notificationTimeoutId)
      }
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

    notificationTimeoutId = setTimeout(() => {
      dispatch(dismissNotification())
    }, displayTime * 1000)
  }
}

export default notificationSlice.reducer
