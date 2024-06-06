describe("template spec", () => {
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
      "https://user-pets-service-4a1c97bde8d0.herokuapp.com/api/v1/pets?user_id=1",
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
      "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/signup",
      {
        statusCode: 200,
        fixture: "PUTuser",
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

    cy.visit("https://rr-as.vercel.app/user/1/management/account");
  });

  it.skip("Displays a success message after PUT", () => {
    cy.get(".css-lll1vm-MuiButtonBase-root-MuiButton-root").click(); //Submit button main form -> opens modal !! PUT request is not initiated yet
    cy.get(".css-1wnsr1i")
      .should("be.visible")
      .within(() => {
        //Modal
        cy.get('input[name="currentPassword"]').type("password");
        cy.get("button").eq(1).click(); //Confirm button -> initiates PUT
      });

    cy.wait("@UpdateUser");
    cy.get(".MuiAlert-colorSuccess").within(() => {
      //Success message
      cy.get(".MuiAlert-message").should("have.text", "Information updated.");
    });
  });

  it.skip("Displays error messages for 400", () => {
    cy.intercept(
      "PUT",
      "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/signup",
      {
        statusCode: 400,
        fixture: "400UserUpdate",
      }
    ).as("400UpdateUser");

    cy.get(".css-lll1vm-MuiButtonBase-root-MuiButton-root").click(); //Submit button main form -> opens modal !! PUT request is not initiated yet
    cy.get(".css-1wnsr1i")
      .should("be.visible")
      .within(() => {
        //Modal
        cy.get('input[name="currentPassword"]').type("password");
        cy.get("button").eq(1).click(); //Confirm button -> initiates PUT
      });
    cy.wait("@400UpdateUser");
    cy.get(".MuiAlert-colorError").within(() => {
      //Success message
      cy.get(".MuiAlert-message").should(
        "have.text",
        "Information did not update. Please ensure your current password is correct."
      );
    });
  });

  it.skip("Displays error messages for 409", () => {
    cy.intercept(
      "PUT",
      "https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/signup",
      {
        statusCode: 409,
        fixture: "409UserUpdate",
      }
    ).as("409UpdateUser");

    cy.get(".css-lll1vm-MuiButtonBase-root-MuiButton-root").click(); //Submit button main form -> opens modal !! PUT request is not initiated yet
    cy.get(".css-1wnsr1i")
      .should("be.visible")
      .within(() => {
        //Modal
        cy.get('input[name="currentPassword"]').type("password");
        cy.get("button").eq(1).click(); //Confirm button -> initiates PUT
      });

    cy.wait("@409UpdateUser");

    cy.get(".MuiAlert-colorError").within(() => {
      //Error message
      cy.get(".MuiAlert-message").should(
        "have.text",
        "An account with this email already exists."
      );
    });
  });

  it.skip("Clears password input after successful PUT", () => {
    cy.get(".css-1086bdv-MuiPaper-root-MuiAccordion-root").click(); //Password accordian
    cy.get('input[name="password"]')
      .type("newPassword")
      .should("have.value", "newPassword");
    cy.get('input[name="confirmPassword"]')
      .type("newPassword")
      .should("have.value", "newPassword");

    cy.get(".css-lll1vm-MuiButtonBase-root-MuiButton-root").click(); //Submit button main form -> opens modal !! PUT request is not initiated yet
    cy.get(".css-1wnsr1i")
      .should("be.visible")
      .within(() => {
        //Modal
        cy.get('input[name="currentPassword"]').type("password");
        cy.get("button").eq(1).click(); //Confirm button -> initiates PUT
      });
    cy.wait("@UpdateUser");

    cy.get(".css-1086bdv-MuiPaper-root-MuiAccordion-root").click(); //Password accordian
    cy.get('input[name="password"]').should("not.have.value");
    cy.get('input[name="confirmPassword"]').should("not.have.value");
  });

  it.skip("Can change all information", () => {
    cy.get('input[name="firstName"]').type("New");
    cy.get('input[name="lastName"]').type("Name");
    cy.get('input[name="email"]').type("newEmail@email.com");

    cy.get(".css-1086bdv-MuiPaper-root-MuiAccordion-root").click(); //Password accordian
    cy.get('input[name="password"]').type("newPassword");
    cy.get('input[name="confirmPassword"]').type("newPassword");

    cy.get(".css-lll1vm-MuiButtonBase-root-MuiButton-root").click(); //Submit button main form -> opens modal !! PUT request is not initiated yet
    cy.get(".css-1wnsr1i")
      .should("be.visible")
      .within(() => {
        //Modal
        cy.get('input[name="currentPassword"]').type("password");
        cy.get("button").eq(1).click(); //Confirm button -> initiates PUT
      });
    cy.wait("@UpdateUser");

    //Navigate away and back to check if changes persisted

    cy.get("nav").children().eq(1).click(); //Navigate to dashboard
    cy.visit("https://rr-as.vercel.app/user/1/management/account"); //Navigate back to account management

    cy.get('input[name="firstName"]').should("have.value", "New");
    cy.get('input[name="lastName"]').should("have.value", "Name");
    cy.get('input[name="email"]').should("have.value", "newEmail@email.com");
  });

  it.skip("Can change some information", () => {
    cy.get('input[name="firstName"]').type("New");
    cy.get('input[name="email"]').type("newEmail@email.com");

    cy.get(".css-lll1vm-MuiButtonBase-root-MuiButton-root").click(); //Submit button main form -> opens modal !! PUT request is not initiated yet
    cy.get(".css-1wnsr1i")
      .should("be.visible")
      .within(() => {
        //Modal
        cy.get('input[name="currentPassword"]').type("password");
        cy.get("button").eq(1).click(); //Confirm button -> initiates PUT
      });

    cy.wait("@UpdateUser");

    //Navigate away and back to check if changes persisted
    cy.get("nav").children().eq(1).click(); //Navigate to dashboard
    cy.visit("https://rr-as.vercel.app/user/1/management/account"); //Navigate back to account management

    cy.get('input[name="firstName"]').should("have.value", "New");
    cy.get('input[name="email"]').should("have.value", "newEmail@email.com");
  });
});
