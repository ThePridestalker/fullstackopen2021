import '@testing-library/jest-dom/extend-expect'
// eslint-disable-next-line no-unused-vars
import { fireEvent, prettyDOM, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  const blog = {
    title: 'test blog',
    author: 'Axel',
    url: 'www.thiscouldbeablogurl.com',
    likes: 0,
    user: {
      username: 'Axelinho',
      name: 'Axel',
      id: '61ae7d38d62c30464ef31dc2'
    },
    id: '61ae7d41d62c30464ef31dc7'
  }

  const user = {
    username: 'Axelinho',
    name: 'Axel'
  }

  let component
  const updateMockHandler = jest.fn()
  const deleteMockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} handleUpdateBlog={updateMockHandler} handleDeleteBlog={deleteMockHandler} />
    )
  })

  it('should render the blogs title and author, but does not render its url or number of likes by default', () => {
    // check that the blog displays title and author
    // component.getByText('test blog - Axel')
    expect(component.container).toHaveTextContent(`${blog.title} - ${blog.author}`)
    // check that the url and likes are not displayed
    // if the dom element doesnt exist, return null
    const blogDetails = component.container.querySelector('.blog-details')
    expect(blogDetails).toBeNull()
  })

  it('should render the blogs url and number of likes when the button controlling the display of details has been clicked', () => {
    const displayDetailsButton = component.getByText('show')
    fireEvent.click(displayDetailsButton)
    // console.log(prettyDOM(component.container))

    // expect(component.container).toHaveTextContent(blog.url)
    const blogUrl = component.container.querySelector('.blog-url')
    expect(blogUrl).toHaveTextContent(blog.url)

    // expect(component.container).toHaveTextContent(`likes ${blog.likes}`)
    const blogLikes = component.container.querySelector('.blog-likes')
    expect(blogLikes).toHaveTextContent(`likes ${blog.likes}`)
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice.', () => {
    // calling updateMockHandler twice when pressing the button of likes twice

    // display the like button
    const displayDetailsButton = component.getByText('show')
    fireEvent.click(displayDetailsButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    // both ways work but the second one is cleaner
    // expect(updateMockHandler.mock.calls).toHaveLength(2)
    expect(updateMockHandler).toHaveBeenCalledTimes(2)
  })
})
