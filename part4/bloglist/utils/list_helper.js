const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (mostLiked, blog) => {
    return (mostLiked.likes > blog.likes) ? mostLiked : blog
  }
  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  const map = new Map()

  blogs.map((blog) => map.set(blog.author, (map.has(blog.author)) ? map.get(blog.author) + 1 : 1))

  let mostBlogsAuthor = {
    author: '',
    blogs: 0
  }

  for (const [author, blogs] of map) {
    if (mostBlogsAuthor.blogs < blogs) {
      mostBlogsAuthor = {
        author: author,
        blogs: blogs
      }
    }
  }

  return mostBlogsAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
