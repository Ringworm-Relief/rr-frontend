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
        statusCode: 409,
        fixture: "existingUser",
      }
    ).as("ExistingUser");

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
    cy.visit("https://rr-as.vercel.app/account/new");
    sessionStorage.setItem("token", "mocked_token");

  });

  it('Shows error helper text if passwords dont match', () => {
    cy.get('input[name="firstName"]').type('John').should('have.value', 'John')
    cy.get('input[name="lastName"]').type('Doe').should('have.value', 'Doe')
    cy.get('input[name="email"]').type('JohnDoe@email.com').should('have.value', 'JohnDoe@email.com')
    cy.get('input[name="password"]').type('password').should('have.value', 'password')
    cy.get('input[name="confirmPassword"]').type('pasdword').should('have.value', 'pasdword')

    cy.get('.css-zajg55').click() //create account button
    cy.get('.css-v7esy').eq(0).should('have.text', 'Passwords do not match') //Password helper text
    cy.get('.css-v7esy').eq(1).should('have.text', 'Passwords do not match') //Password helper text
  });

  it('Shows message if account already exists', () => {
    cy.get('.css-zajg55').click() // create account button
    cy.wait("@ExistingUser");
    cy.get(".css-nkgkfs").should("have.text", "You already have an account, please log in")
  })


  it('Routes to sign in page on successful account creation', () => {
    cy.intercept(
      "POST",
      "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/signup",
      {
        statusCode: 201,
        fixture: "newUser",
      }
    ).as("NewUser");
    cy.get('.css-zajg55').click() //create account button 
    cy.wait("@NewUser");
    cy.url().should("include", "account/signin");
  })
})