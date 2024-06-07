describe("Landing Page", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://8deefa6e-9aee-47e2-b8ea-a4dd591b3fc3.mock.pstmn.io/api/v1/users/1",
      {
        statusCode: 200,
        fixture: "user",
      }
    )
      .as("GetUser")

      .visit("https://rr-as.vercel.app");
  });

  it("should display the landing page", () => {
    cy.get("header")
      .should("be.visible")
      .get("nav")
      .should("be.visible")
      .get("nav > div")
      .should("have.length", 3)

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

  it("Should show services cards", () => {
    cy.get(".outline-card").within(() => {
      cy.get(".css-1g5t0ys")
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
          cy.get(".MuiTypography-h2").should("have.text", "Ringworm in Dogs");
        });

      cy.get(".css-1qw96cp")
        .eq(1)
        .within(() => {
          cy.get(".MuiTypography-h2").should("have.text", "Ringworm in Cats");
        });

      cy.get(".css-1qw96cp")
        .last()
        .within(() => {
          cy.get(".MuiTypography-h2").should("have.text", "Ringworm in Horses");
        });
    });
  });

  it("Should show a drawer on hamburger click", () => {
    // cy.get('.css-1160xiw-MuiPaper-root-MuiDrawer-paper').should('be.hidden')
    cy.get(".css-1deacqj").click();
    cy.get(".MuiDrawer-paper").within(() => {
      cy.get(".MuiListItemButton-root").should("have.length", 8);
      cy.get(".MuiListItemButton-root").eq(0).should("have.text", "Sign In");
      cy.get(".MuiListItemButton-root").eq(1).should("have.text", "Dashboard");
      cy.get(".MuiListItemButton-root").eq(2).should("have.text", "Education");
      cy.get(".MuiListItemButton-root").eq(3).should("have.text", "Calendar");
      cy.get(".MuiListItemButton-root")
        .eq(4)
        .should("have.text", "Saved Articles");
      cy.get(".MuiListItemButton-root").eq(5).should("have.text", "Add Pet");
      cy.get(".MuiListItemButton-root")
        .eq(6)
        .should("have.text", "Manage Account");
      cy.get(".MuiListItemButton-root")
        .eq(7)
        .should("have.text", "Manage Pets");
    });
  });
});
