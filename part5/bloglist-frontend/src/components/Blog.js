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
      <p className='blog-title-and-author'>{blog.title} - {blog.author} <button onClick={() => setDisplayDetails(!displayDetails)}>{displayDetails ? 'hide' : 'show'}</button></p>
      {
        displayDetails &&
          <div className='blog-details'>
            <p className='blog-url'>{blog.url}</p>
            <p className='blog-likes'>likes {blog.likes} <button onClick={() => increaseLikes(blog)}>like</button>
            </p>
            <p className='blog-owner'>{blog.user.name}</p>
          </div>
      }
      <button id='deleteBlog' style={handleVisible(blog.user.name)} onClick={() => deleteBlog(blog.id)}>delete</button>
    </div>
  )
}

export default Blog
