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
      "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/signup",
      {
        statusCode: 201,
        fixture: "newUser",
      }
    ).as("NewUser");

    // Intercept the pets request and mock the response
    cy.intercept(
      "GET",
      "https://8deefa6e-9aee-47e2-b8ea-a4dd591b3fc3.mock.pstmn.io/api/v1/pets/1",
      {
        statusCode: 200,
        fixture: "pets", // Assuming you have a fixture file named 'pets.json'
      }
    ).as("GetPets");

    cy.intercept(
      "GET",
      "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/1/calendar_events",
      {
        statusCode: 200,
        fixture: "calendar", // Assuming you have a fixture file named 'pets.json'
      }
    ).as("GetCalendar");

    // Visit the landing page
    cy.visit("https://rr-as.vercel.app/account/new");
    sessionStorage.setItem("token", "mocked_token");

  });

  it('Shows all inputs and their values', () => {
    cy.get('input').should('have.length', 5)
    cy.get('input[name="firstName"]').type('John').should('have.value', 'John')
    cy.get('input[name="lastName"]').type('Doe').should('have.value', 'Doe')
    cy.get('input[name="email"]').type('JohnDoe@email.com').should('have.value', 'JohnDoe@email.com')
    cy.get('input[name="password"]').type('password').should('have.value', 'password')
    cy.get('input[name="confirmPassword"]').type('password').should('have.value', 'password')

    cy.get('.css-slyssw').should('have.attr', 'aria-label', 'toggle password visibility')
  });

  it('Shows password visibility button, sign up, and login buttons', () => {
    cy.get('.css-zajg55').should('have.text', 'Create Account')
    cy.get('.css-1ujsas3').within(() => {
      cy.get('a').should('have.text', 'Click Here To Sign In')
    })
  })
});