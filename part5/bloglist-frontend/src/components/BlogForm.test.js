import '@testing-library/jest-dom/extend-expect'
// eslint-disable-next-line no-unused-vars
import { fireEvent, prettyDOM, render } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {
  test('the form calls the event handler it received as props with the right details when a new blog is created', () => {
    const handleCreateBlog = jest.fn()

    const component = render(
      <BlogForm handleCreateBlog={handleCreateBlog} />
    )

    const blogForm = component.container.querySelector('#blogForm')

    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')

    fireEvent.change(inputTitle, { target: { value: 'title test' } })
    fireEvent.change(inputAuthor, { target: { value: 'author test' } })
    fireEvent.change(inputUrl, { target: { value: 'url test' } })

    fireEvent.submit(blogForm)

    // expect(handleCreateBlog.mock.calls).toHaveLength(1)
    // expect(handleCreateBlog).toHaveBeenCalledTimes(1)

    // The first argument of the first call to the function
    // [number indicating the times this mock fn was called][the index of the argument]
    // if we want the second call parameters, its [1][0] for example
    // in this case, the mock fn receives the submit, so the index of the argument is always 0

    // Calling the fireEvent.submit(blogForm) twice we get the following:
    //   [
    //     [{ title: 'title test', author: 'author test', url: 'url test' }],
    //     [{ title: '', author: '', url: '' }]
    //   ]

    expect(handleCreateBlog.mock.calls[0][0].title).toBe('title test')
    expect(handleCreateBlog.mock.calls[0][0].author).toBe('author test')
    expect(handleCreateBlog.mock.calls[0][0].url).toBe('url test')
  })
})
