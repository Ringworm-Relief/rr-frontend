// describe('Landing Page', () => {
//     beforeEach(() => {
//       localStorage.setItem('token', 'mocked_token');
//       cy.visit('http://localhost:3000/'); 
//       cy.get("#sign-in-link").click()
//       cy.url().should('include', 'account/signin')
//       cy.intercept('POST', 'https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/login', {
//         statusCode: 201,
//         fixture: 'user'
//       }).as('GetUser')
//       cy.get("#handle-signin-btn").click()
//       cy.intercept('GET', 'https://8deefa6e-9aee-47e2-b8ea-a4dd591b3fc3.mock.pstmn.io/api/v1/pets/1', {
//         statusCode: 200,
//         fixture: 'pets'
//       }).as('GetPets')

//     })
    


//     it('Should navigate to Petform from drawer', () => {
//       cy.url().should('include', 'dashboard')
//         cy.get('#drawer').click()
//         // cy.url().should('include', 'http://localhost:3000/')
//     })

// })

describe('Landing Page', () => {
  beforeEach(() => {
    // Set a mock token in local storage
    localStorage.setItem('token', 'mocked_token');

    // Intercept the login request and mock the response
    cy.intercept('POST', 'https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/login', {
      statusCode: 201,
      fixture: 'user' // Assuming you have a fixture file named 'user.json'
    }).as('LoginUser');

    // Intercept the pets request and mock the response
    cy.intercept('GET', 'https://8deefa6e-9aee-47e2-b8ea-a4dd591b3fc3.mock.pstmn.io/api/v1/pets/1', {
      statusCode: 200,
      fixture: 'pets' // Assuming you have a fixture file named 'pets.json'
    }).as('GetPets');

    // Visit the landing page
    cy.visit('http://localhost:3000/');
    
    // Click on the sign-in link
    cy.get('#sign-in-link').click();
    
    // Verify that the URL includes 'account/signin'
    cy.url().should('include', 'account/signin');

    // Click on the sign-in button
    cy.get('#handle-signin-btn').click();

    // Wait for the login request to complete
    cy.wait('@LoginUser');

    // Ensure the URL includes 'dashboard' after login
    cy.url().should('include', 'dashboard');
  });

  it('Should navigate to Petform from drawer', () => {
    // Verify we are on the dashboard page
    cy.url().should('include', 'dashboard');

    // Click on the drawer toggle
    cy.get('#drawer').click();

    // Add any additional steps to navigate to the Petform from the drawer
    // For example, clicking on a link or button inside the drawer

    // Verify the navigation to the Petform page
    // Add the correct URL or element assertions based on your application's behavior
    // cy.url().should('include', 'expected-url-for-petform');
    // or
    // cy.get('#expected-element-on-petform-page').should('exist');
  });
});
