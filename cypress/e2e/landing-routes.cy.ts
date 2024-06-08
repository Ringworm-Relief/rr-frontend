describe("Landing Page", () => {
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
    cy.visit("https://rr-as.vercel.app/");
    sessionStorage.setItem("token", "mocked_token");

    // Click on the sign-in link
    cy.get("#sign-in-link").click();

    // Verify that the URL includes 'account/signin'
    cy.url().should("include", "account/signin");

    // Click on the sign-in button
    cy.get("#handle-signin-btn").click();
    cy.get("#handle-signin-btn").click(); //Suddenly two clicks needed

    // Wait for the login request to complete
    cy.wait("@LoginUser");

    // Ensure the URL includes 'dashboard' after login
    cy.url().should("include", "dashboard");

    cy.get(".App_link_cat").click();
    cy.url().should("include", "/");
  });

  it.skip("Should navigate to Calender from Nav", () => {
    cy.get(".App_nav_links").eq(1).click();
    cy.url().should("include", "/user/1/calendar");

    cy.get(".App_link_cat").click();
    cy.url().should("include", "/");
  });

  it.skip("Should navigate to Dashboard from Nav", () => {
    cy.get("a").eq(2).click();
    cy.url().should("include", "/user/1/dashboard");

    cy.get(".App_link_cat").click();
    cy.url().should("include", "/");
  });

  it.skip("Should navigate to Education from Nav", () => {
    cy.get("a").eq(3).click();
    cy.url().should("include", "/education");

    cy.get(".App_link_cat").click();
    cy.url().should("include", "/");
  });

  it.skip("Should navigate to Article from Education", () => {
    //Add tests after landing articles have been updated
    cy.get("a").eq(3).click();
    cy.url().should("include", "/education");

    cy.get(".css-1g5t0ys").eq(0).click();
    cy.url().should("include", "/education/cleaning");

    cy.get("a").eq(3).click();
    cy.get(".css-1g5t0ys").eq(1).click();
    cy.url().should("include", "/education/medical");

    cy.get("a").eq(3).click();
    cy.get(".css-1g5t0ys").eq(2).click();
    cy.url().should("include", "/education/general");
  });

  it.skip("Should navigate to Sign In from Drawer", () => {
    cy.get(".css-1deacqj").click();
    cy.get(".MuiDrawer-paper").within(() => {
      cy.get(".css-1uwabd6").eq(0).click();
    });
    cy.url().should("include", "/signin");
  });

  it.skip("Should navigate to Dashboard from Drawer", () => {
    cy.get(".App_link_cat").click();
    cy.url().should("include", "/");

    cy.get(".css-1deacqj").click();
    cy.get(".MuiDrawer-paper").within(() => {
      cy.get(".css-1uwabd6").eq(1).click();
    });
    cy.url().should("include", "/user/1/dashboard");
  });

  it.skip("Should navigate to Calendar In from Drawer", () => {
    cy.get(".css-1deacqj").click();
    cy.get(".MuiDrawer-paper").within(() => {
      cy.get(".css-1uwabd6").eq(2).click();
    });
    cy.url().should("include", "/user/1/calendar");
  });

  it.skip("Should navigate to Saved Articles from Drawer", () => {
    //Add tests after saved articles is created
    cy.get(".css-1deacqj").click();
    cy.get(".MuiDrawer-paper").within(() => {
      cy.get(".css-1uwabd6").eq(3).click();
    });
    cy.url().should("include", "/savedarticles"); //Change to /user/1/savedArticles
  });

  it.skip("Should navigate to Add pet from Drawer", () => {
    cy.get(".css-1deacqj").click();
    cy.get(".MuiDrawer-paper").within(() => {
      cy.get(".css-1uwabd6").eq(4).click();
    });
    cy.url().should("include", "/addpet");
  });


  it.skip("Should navigate to Account Management from Drawer", () => {
    cy.get(".css-1deacqj").click();
    cy.get(".MuiDrawer-paper").within(() => {
      cy.get(".css-1uwabd6").eq(5).click();
    });
    cy.url().should("include", "/management/account");
  });

  it.skip("Should navigate to Pet Management from Drawer", () => {
    cy.get(".css-1deacqj").click();
    cy.get(".MuiDrawer-paper").within(() => {
      cy.get(".css-1uwabd6").eq(6).click();
    });
    cy.url().should("include", "/management/pets"); 
  });

});
