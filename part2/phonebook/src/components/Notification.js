const Notification = ({ message, msgType }) => {
  if (message === null) {
    return null
  }

  if (msgType === 'success') {
    return <div className="success">{message}</div>
  } else {
    return <div className="error">{message}</div>
  }
}

export default Notification
