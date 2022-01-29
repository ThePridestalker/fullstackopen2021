import { useState } from 'react'
const Blog = ({ blog, user, handleUpdateBlog, handleDeleteBlog }) => {
  const [displayDetails, setDisplayDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const increaseLikes = (blog) => {
    const blogWithLikesIncreased = {
      ...blog,
      likes: blog.likes + 1
    }
    handleUpdateBlog(blog.id, blogWithLikesIncreased)
  }

  const deleteBlog = (blogId) => {
    if (window.confirm('Do you really want to leave?')) {
      handleDeleteBlog(blogId)
    }
  }

  const handleVisible = (blogCreator) => {
    if (blogCreator !== user.name) {
      return { display: 'none' }
    }
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} - {blog.author}<button onClick={() => setDisplayDetails(!displayDetails)}>{displayDetails ? 'hide' : 'show'}</button> <br />
      {
        displayDetails &&
          <div className='blog-url-and-likes'>
            {blog.url}
            <br />
            likes {blog.likes} <button onClick={() => increaseLikes(blog)}>like</button>
            <br />
            {blog.user.name}
            <br />
          </div>
      }
      <button style={handleVisible(blog.user.name)} onClick={() => deleteBlog(blog.id)}>delete</button>
    </div>
  )
}

export default Blog
