
export const newNotification = (message) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: message
  }
}

export const dismissNotification = () => {
  return {
    type: 'DISMISS_NOTIFICATION',
    data: null
  }
}

const notificationReducer = (state = null, action) => {
  console.log('NOTIFICATION REDUCER - ACTION', action)
  console.log('NOTIFICATION REDUCER - STATE', state)

  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data
    case 'DISMISS_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export default notificationReducer