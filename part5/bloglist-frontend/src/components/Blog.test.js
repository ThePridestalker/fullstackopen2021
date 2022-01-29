import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  test('should render the blogs title and author, but does not render its url or number of likes by default', () => {
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

    const updateMockHandler = jest.fn()
    const deleteMockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} user={user} handleUpdateBlog={updateMockHandler} handleDeleteBlog={deleteMockHandler} />
    )

    const urlAndLikes = component.container.querySelector('.blog-url-and-likes')

    // check that the blog displays title and author
    component.getByText('test blog - Axel')

    // check that the url and likes are not displayed
    expect(urlAndLikes).toBeNull()
  })
})
