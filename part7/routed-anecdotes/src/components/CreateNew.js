import useField from '../hooks/useField'

const CreateNew = ({ addNew }) => {
  const { reset: resetContent, ...content } = useField({ name: 'content', type: 'text' })
  const { reset: resetAuthor, ...author } = useField({ name: 'author', type: 'text' })
  const { reset: resetInfo, ...info } = useField({ name: 'info', type: 'text' })

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={handleReset} style={{ marginLeft: '10px' }}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
