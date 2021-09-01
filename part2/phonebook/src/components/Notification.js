const Notification = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  }

  return <div className="success">{errorMessage}</div>
}

export default Notification
