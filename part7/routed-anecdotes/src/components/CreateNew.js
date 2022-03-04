import useField from '../hooks/useField'

const CreateNew = ({ addNew }) => {
  const content = useField({ name: 'content', type: 'text' })
  const author = useField({ name: 'author', type: 'text' })
  const info = useField({ name: 'info', type: 'text' })

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
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
        <button>create</button>
      </form>
    </div>
  )
}

export default CreateNew
