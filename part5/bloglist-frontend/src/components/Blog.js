import { useState } from 'react'
const Blog = ({ blog }) => {
  const [displayDetails, setDisplayDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={() => setDisplayDetails(!displayDetails)}>{displayDetails ? 'hide' : 'show'}</button> <br />
      {displayDetails &&
        <div>{blog.url}<br />
          likes {blog.likes} <button>like</button> <br />
          {blog.author}<br />
        </div>}
    </div>
  )
}

export default Blog
