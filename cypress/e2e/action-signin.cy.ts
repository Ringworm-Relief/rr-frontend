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

  it.skip('Routes to the dashboard on successful login', () => { //BLINKING TEST
    cy.get("#handle-signin-btn").click()
    cy.wait("@LoginUser");
    cy.url().should("include", "dashboard");
  })

  it('Displays an error helper text if login is incorrect/401', () => {
    cy.intercept(
      "POST",
      "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/login",
      {
        statusCode: 401,
        // Assuming you have a fixture file named 'user.json'
      }
    ).as("BadLoginUser");

    cy.get('#handle-signin-btn').click()
    cy.wait('@BadLoginUser')
    cy.get('.css-sqgx1g').should('have.text', 'Email or Password is incorrect. Please try again.')
  })

  it('Routes to the create account page if button is clicked', () => {
    cy.get('.css-1ujsas3').click()
    cy.url().should('include', '/account/new')
  })
})