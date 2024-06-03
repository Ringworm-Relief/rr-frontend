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

    // Ensure the URL includes 'dashboard' after login
    cy.url().should("include", "dashboard");
  });

  it("Should include three pet cards", () => {
    //Pet cards should be visible
    cy.get(".css-1v55mgz-MuiPaper-root-MuiCard-root").should("have.length", 3);

    cy.get(".css-1v55mgz-MuiPaper-root-MuiCard-root").eq(0).within(() => {
      cy.get(".css-jyhipo-MuiCardMedia-root").should("have.attr", "style").should("include", 'background-image: url("/static/media/Pupper-profile.622f163b4e11a88c738ddd6ad62ca432.svg')
      cy.get("h5").should("have.text", "keoki")
    })

    cy.get(".css-1v55mgz-MuiPaper-root-MuiCard-root").eq(1).within(() => {
      cy.get(".css-jyhipo-MuiCardMedia-root").should("have.attr", "style").should("include", 'background-image: url("/static/media/Kitty-profile.12d55bfd7fa95ad9ec585798bbb66f9f.svg')
      cy.get("h5").should("have.text", "koki")
    })

    cy.get(".css-1v55mgz-MuiPaper-root-MuiCard-root").eq(2).within(() => {
      cy.get(".css-1qvr50w-MuiTypography-root").should("have.text", "Add Pet")
    })
  });

  it("Should show the calendar with a default agenda view", () => {
    cy.get(".e-schedule").should("be.visible")

    //Ensure agenda view is the default view
    cy.get(".e-agenda").should("have.class", "e-active-view")
  });

  it("Should show saved articles", () => {
    //Navigate to Education
    cy.get("a").eq(3).click();

    //Click Cleaning category
    cy.get(".css-1uirrzm-MuiPaper-root-MuiCard-root").eq(0).click();
    cy.url().should("include", "/education/cleaning");

    //Article card within cleaning category -> click save icon
    cy.get(".css-174d5eo-MuiPaper-root-MuiCard-root").should("be.visible")
    cy.get(".css-1t5hwt4-MuiButtonBase-root-MuiIconButton-root").click();

    //Navigate back to Dashboard
    cy.get("a").eq(2).click();

    //Check if saved article is displayed
    cy.get(".css-lfvik5-MuiPaper-root-MuiCard-root").within(() => {
      cy.get("h6").should("have.text", "Cleaning 101")
      cy.get(".css-1t5hwt4-MuiButtonBase-root-MuiIconButton-root").should("be.visible")
    })
  });

  it("Should show a link to manage account", () => {
    cy.get("a").eq(5).within(() => {
      cy.get(".css-zg5e0d-MuiPaper-root-MuiCard-root")
      cy.get(".css-1qvr50w-MuiTypography-root").should("have.text", "Manage Account")
    })
  });

  it("Should show a link to manage pets", () => {
    cy.get("a").eq(6).within(() => {
      cy.get(".css-zg5e0d-MuiPaper-root-MuiCard-root")
      cy.get(".css-1qvr50w-MuiTypography-root").should("have.text", "Manage Pets")
    })
  });
})