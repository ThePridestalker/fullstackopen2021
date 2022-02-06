describe('Blog App', function () {
  let user

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')

    user = {
      name: 'Axel',
      username: 'Axelinho95',
      password: 'testingpassword'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })

  it('the application displays the login form by default', function () {
    cy.get('#login-form')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrongUsername')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When logged in', function () {
    let user2
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password })

      user2 = {
        name: 'Random',
        username: 'RandomUsername',
        password: 'testingpassword'
      }

      cy.request('POST', 'http://localhost:3003/api/users/', user2)
    })
    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('blog title from cypress')
      cy.get('#author').type('Axel')
      cy.get('#url').type('www.thiscouldbeablogurl.com')
      cy.get('#submitButton').click()
      cy.get('.success')
    })

    it('Users can like a blog', function () {
      cy.createBlog(
        {
          title: 'blog title from cypress',
          author: 'Axel',
          url: 'www.thiscouldbeablogurl.com'
        }
      )

      cy.contains('blog title from cypress')
      cy.contains('show').click()
      cy.contains('like').click()
      cy.contains('likes 1')

      // checking with other user
      cy.contains('logout').click()

      cy.login({ username: user2.username, password: user2.password })

      cy.contains('blog title from cypress')
      cy.contains('show').click()
      cy.contains('like').click()
      cy.contains('likes 2')
    })

    it('Owner user can delete a blog', function () {
      cy.createBlog(
        {
          title: 'blog title from cypress',
          author: 'Axel',
          url: 'www.thiscouldbeablogurl.com'
        }
      )

      cy.contains('blog title from cypress')
      cy.contains('delete').click()
      cy.contains('blog title from cypress').should('not.exist')
    })

    it('User cant delete a blog he is not owner of', function () {
      cy.createBlog(
        {
          title: 'you cant delete me if you are not the owner',
          author: 'Axel',
          url: 'www.thiscouldbeablogurl.com'
        }
      )
      // checking with other user
      cy.contains('logout').click()

      cy.login({ username: user2.username, password: user2.password })

      cy.contains('you cant delete me if you are not the owner')
      cy.get('#deleteBlog').should('have.css', 'display', 'none')
    })
  })
})
