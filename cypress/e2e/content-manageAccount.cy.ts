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

    cy.intercept(
      "PUT",
      "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/login",
      {
        statusCode: 200,
        fixture: "newUser", // Assuming you have a fixture file named 'pets.json'
      }
    ).as("UpdateUser");

    // Visit the landing page
    cy.visit("https://rr-as.vercel.app/");
    sessionStorage.setItem("token", "mocked_token");
    
 // Click on the sign-in link
 cy.get("#sign-in-link").click();

 // Verify that the URL includes 'account/signin'
 cy.url().should("include", "account/signin");

 // Click on the sign-in button
 cy.get("#handle-signin-btn").click();

 // Wait for the login request to complete
 cy.wait("@LoginUser");

 cy.visit("http://localhost:3000/user/1/management/account");
  });

  it.skip('Shows inputs for name and email with default value', () => {
    cy.get('input[name="firstName"]').should('have.value', 'John')
    cy.get('input[name="lastName"]').should('have.value', 'Doe')
    cy.get('input[name="email"]').should('have.value', 'JohnDoe@gmail.com')
  })

  it.skip('Shows an accordian holding both password inputs with no value', () => {
    cy.get('.css-1086bdv-MuiPaper-root-MuiAccordion-root').within(() => { //Password accordian
      cy.get('input[name="password"]').should('not.have.value')
      cy.get('input[name="confirmPassword"]').should('not.have.value')
    })
  })

  it.skip('Displays a modal with current password confirmation after submission', () => {
    cy.get('.css-lll1vm-MuiButtonBase-root-MuiButton-root').click() //Submit button main form
    cy.get('.css-1wnsr1i').should('be.visible').within(() => {
      cy.get('.css-2ulfj5-MuiTypography-root').should('have.text', 'Please confirm your current password')
      cy.get('input[name="currentPassword"]').should('be.visible')
      cy.get('button').should('have.text', 'Confirm')
    })
  })
})