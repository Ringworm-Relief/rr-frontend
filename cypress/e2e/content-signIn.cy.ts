describe('template spec', () => {
  beforeEach(() => {
    // Intercept the login request and mock the response
    cy.intercept(
      "POST",
      "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/login",
      {
        statusCode: 201,
        fixture: "user", // Assuming you have a fixture file named 'user.json'
      }
    ).as("LoginUser");

    cy.intercept(
      "POST",
      "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/login",
      {
        statusCode: 401,
        // Assuming you have a fixture file named 'user.json'
      }
    ).as("BadLoginUser");

    // Intercept the pets request and mock the response
    cy.intercept(
      "GET",
      "https://user-pets-service-4a1c97bde8d0.herokuapp.com/api/v1/pets?user_id=1",
      {
        statusCode: 200,
        fixture: "pets", // Assuming you have a fixture file named 'pets.json'
      }
    ).as("GetPets");

    cy.intercept(
      "GET",
      "https://rr-educational-articles-efb008e252bf.herokuapp.com/api/v1/educational_articles",
      {
        statusCode: 200,
        fixture: "articles", // Assuming you have a fixture file named 'pets.json'
      }
    ).as("GetArticles");

    cy.intercept(
      "GET",
      "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/1/calendar_events",
      {
        statusCode: 200,
        fixture: "calendar", // Assuming you have a fixture file named 'pets.json'
      }
    ).as("GetCalendar");

    // Visit the landing page
    cy.visit("https://rr-as.vercel.app/account/signin");
    sessionStorage.setItem("token", "mocked_token");

  });

  it('Shows username and password inputs and has value', () => {
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')

    cy.get('input[name="email"]').type('email@email.com').should('have.value', 'email@email.com')
    cy.get('input[name="password"]').type('password').should('have.value', 'password')
  })

  it('Shows password toggle button, sign in, and create account button', () => {
    cy.get('.css-slyssw').should('have.attr', 'aria-label', 'toggle password visibility') //Password toggle button
    cy.get('#handle-signin-btn').should('exist').should('have.text', 'Sign In') //Sign in button
    cy.get('.css-1ujsas3').within(() => { //Create account button
      cy.get('a').should('have.text', 'Create Account')
    })
  })
})