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
    cy.visit("http://localhost:3000/account/signin");
    sessionStorage.setItem("token", "mocked_token");

  });

  it('Shows username and password inputs and has value', () => {
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')

    cy.get('input[name="email"]').type('email@email.com').should('have.value', 'email@email.com')
    cy.get('input[name="password"]').type('password').should('have.value', 'password')
  })

  it.skip('Routes to the dashboard on successful login', () => {
    cy.get("#handle-signin-btn").click();
    cy.wait("@LoginUser");
    cy.url().should("include", "dashboard");
  })

  it('Displays an error helper text if login is incorrect/401', () => {
    cy.get('#handle-signin-btn').click()
    cy.wait('@BadLoginUser')
    cy.get('.css-1kivl2a-MuiTypography-root').should('have.text', 'Email or Password is incorrect. Please try again.')
  })

  it('passes', () => {
    
  })
})