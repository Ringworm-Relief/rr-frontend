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
      "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/1/calendar_events",
      {
        statusCode: 200,
        fixture: "calendar", // Assuming you have a fixture file named 'pets.json'
      }
    ).as("GetCalendar");

    // Visit the landing page
    cy.visit("http://localhost:3000/");
    sessionStorage.setItem("token", "mocked_token");

    // Click on the sign-in link
    cy.get("#sign-in-link").click();

    // Verify that the URL includes 'account/signin'
    cy.url().should("include", "account/signin");

    // Click on the sign-in button
    cy.get("#handle-signin-btn").click();

    // Wait for the login request to complete
    cy.wait("@LoginUser");

    // Ensure the URL includes 'dashboard' after login
    cy.url().should("include", "dashboard");
  });

  it("Should include three pet cards", () => {
    cy.get(".css-ecl1eb-MuiPaper-root-MuiCard-root").should("have.length", 3);

    cy.get(".css-ecl1eb-MuiPaper-root-MuiCard-root").eq(0).within(() => {
      cy.get(".css-jyhipo-MuiCardMedia-root").should("have.attr", "style").should("include", 'background-image: url("/static/media/Pupper-profile.622f163b4e11a88c738ddd6ad62ca432.svg')
      cy.get("h5").should("have.text", "Alfred")
    })

    cy.get(".css-ecl1eb-MuiPaper-root-MuiCard-root").eq(1).within(() => {
      cy.get(".css-jyhipo-MuiCardMedia-root").should("have.attr", "style").should("include", 'background-image: url("/static/media/Kitty-profile.12d55bfd7fa95ad9ec585798bbb66f9f.svg')
      cy.get("h5").should("have.text", "Bella")
    })

    cy.get(".css-ecl1eb-MuiPaper-root-MuiCard-root").eq(2).within(() => {
      cy.get(".css-jyhipo-MuiCardMedia-root").should("have.attr", "style").should("include", 'background-image: url("/static/media/Pupper-profile.622f163b4e11a88c738ddd6ad62ca432.svg')
      cy.get("h5").should("have.text", "Charlie")
    })
  });

  it.skip("Should show the calendar with a default list view", () => {
    cy.get(".e-schedule").should("be.visible")
  });

  it.skip("Should show saved articles", () => {

  });

  it.skip("Should show a link to add a pet", () => {

  });

  it.skip("Should show a link to manage account", () => {

  });
})