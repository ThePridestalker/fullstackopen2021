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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password })
    })
    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('blog title from cypress')
      cy.get('#author').type('Axel')
      cy.get('#url').type('www.thiscouldbeablogurl.com')
      cy.get('#submitButton').click()
      cy.get('.success')
    })
  })
})
