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
        "https://user-pets-service-4a1c97bde8d0.herokuapp.com/api/v1/pets?user_id=1",
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

      cy.visit("https://rr-as.vercel.app");
  });

  it("should display the landing page", () => {
    cy.get("header")
      .should("be.visible")
      .get("nav")
      .should("be.visible")
      .get("nav > div")
      .should("have.length", 4)

      .get(".MuiPaper-root")
      .first()
      .should("be.visible")
      .get(".MuiPaper-root")
      .first()
      .within(() => {
        cy.get("h2")
          .should("be.visible")
          .get("h2")
          .should("have.text", "Ringworm, Relief,Repeat?")
          // .get('p').should('have.text', 'Nope! Just Ringworm then Relief. Use our education, tracking, and  orginization to track all your furry friends treatment.  No more wondering when the last time you treated your pet was,  or cluttering your personal calendar with reminders.')
          .get("button")
          .first()
          .should("have.text", "Get Started Here")
          .get("button")
          .last()
          .should("have.text", "Sign In");
      });
  });

  it.skip("Should show services cards", () => { //Need to add scroll functionality to this since they only appear when in view
    cy.get(".outline-card").within(() => {
      cy.get(".css-css-1wxaqej").scrollIntoView()
        .first()
        .within(() => {
          cy.get(".css-168deq9").should("have.text", "Education");
        });

      cy.get(".css-1g5t0ys")
        .eq(1)
        .within(() => {
          cy.get(".css-168deq9").should("have.text", "Treatment tracking");
        });

      cy.get(".css-1g5t0ys")
        .last()
        .within(() => {
          cy.get(".css-168deq9").should("have.text", "Support");
        });
    });
  });

  it("Should show article cards", () => {
    cy.get(".article-card").within(() => {
      cy.get(".css-1qw96cp")
        .first()
        .within(() => {
          cy.get(".MuiTypography-h2").should("have.text", "What is ringworm?");
        });

      cy.get(".css-1qw96cp")
        .eq(1)
        .within(() => {
          cy.get(".MuiTypography-h2").should("have.text", "Who can get ringworm?");
        });

      cy.get(".css-1qw96cp")
        .last()
        .within(() => {
          cy.get(".MuiTypography-h2").should("have.text", "How does ringworm spread?");
        });
    });
  });

  it("Should show a drawer on hamburger click", () => {
    // cy.get('.css-1160xiw-MuiPaper-root-MuiDrawer-paper').should('be.hidden')
    cy.get(".css-1deacqj").click();
    cy.get(".MuiDrawer-paper").within(() => {
      cy.get(".MuiListItemButton-root").should("have.length", 9);
      cy.get(".MuiListItemButton-root").eq(0).should("have.text", "Sign In");
      cy.get(".MuiListItemButton-root").eq(1).should("have.text", "Dashboard");
      cy.get(".MuiListItemButton-root").eq(2).should("have.text", "Support");
      cy.get(".MuiListItemButton-root").eq(3).should("have.text", "Education");
      cy.get(".MuiListItemButton-root").eq(4).should("have.text", "Calendar");
      cy.get(".MuiListItemButton-root")
        .eq(5)
        .should("have.text", "Saved Articles");
      cy.get(".MuiListItemButton-root").eq(6).should("have.text", "Add Pet");
      cy.get(".MuiListItemButton-root")
        .eq(7)
        .should("have.text", "Manage Account");
      cy.get(".MuiListItemButton-root")
        .eq(8)
        .should("have.text", "Manage Pets");
    });
  });
});
