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
        fixture: "calendar",
      }
    ).as("GetCalendar");

    cy.intercept(
      "PUT",
      "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/login",
      {
        statusCode: 200,
        fixture: "newUser", 
      }
    ).as("UpdateUser");

    cy.intercept(
      "PUT",
      "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/login",
      {
        statusCode: 401,
        fixture: "newUser",
      }
    ).as("UpdateUser");

    cy.intercept(
      "PUT",
      "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/login",
      {
        statusCode: 409,
        fixture: "newUser",
      }
    ).as("UpdateUser");

    // Visit the landing page
    cy.visit("http://localhost:3000/");
    sessionStorage.setItem("token", "mocked_token");

  });

  it('Displays error messages for 401 and 409 status codes', () => {

  })

  it('Displays a success message after PUT', () => {

  })

  it('Clears password input after successful PUT', () => {

  })

  it('Can change all information', () => {

  })

  it('Can change some information', () => {

  })

})