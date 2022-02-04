
import PropTypes from 'prop-types'

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }

  if (messageType === 'success') {
    return <div className='success'>{message}</div>
  } else {
    return <div className='error'>{message}</div>
  }
}

Notification.propTypes = {
  // removed the .isRequired to avoid error if it was null
  message: PropTypes.string,
  messageType: PropTypes.string.isRequired
}

export default Notification
