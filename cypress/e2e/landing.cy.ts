describe('Landing Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://8deefa6e-9aee-47e2-b8ea-a4dd591b3fc3.mock.pstmn.io/api/v1/users/1', {
      statusCode: 200,
      fixture: 'user'
    }).as('GetUser')
    .visit('http://localhost:3000/')
  })

  it('should display the landing page', () => {
    cy.get('header').should('be.visible')
    .get('nav').should('be.visible')
    .get('nav > div').should('have.length', 4)

    .get('.MuiPaper-root').first().should('be.visible')
    .get('.MuiPaper-root').first().within(() => {
      cy.get('h2').should('be.visible')
      .get('h2').should('have.text', 'Ringworm is an underestimated diagnosis')
      .get('button').first().should('have.text', 'Sign Up')
      .get('button').last().should('have.text', 'Sign In')
    })
  })

  it('Should show services cards', () => {
    cy.get('.outline-card').within(() => {
      cy.get('.css-13i4rnv-MuiGrid-root').first().within(() => {
        cy.get( '.MuiCardMedia-root').should('have.text', 'Education')
      })
      //Need to test second card
  
      cy.get('.css-13i4rnv-MuiGrid-root').last().within(() => {
        cy.get( '.MuiCardMedia-root').should('have.text', 'Support')
      })
    })
  })

  it('Should show services cards', () => {
    cy.get('.article-card').within(() => {
      cy.get('.css-46bh2p-MuiCardContent-root').first().within(() => {
        cy.get( '.MuiTypography-h2').should('have.text', 'Ringworm in Dogs')
      })
      //Need to test second card
  
      cy.get('.css-46bh2p-MuiCardContent-root').last().within(() => {
        cy.get( '.MuiTypography-h2').should('have.text', 'Ringworm in Horses')
      })
    })
  })

  it('Should show a drawer on hamburger click', () => {
    // cy.get('.css-1160xiw-MuiPaper-root-MuiDrawer-paper').should('not.be.visible')
    cy.get('.css-zylse7-MuiButtonBase-root-MuiIconButton-root').click()
    cy.get('.MuiDrawer-paper').within(() => {
      cy.get('.MuiListItemButton-root').should('have.length', 4)
    })
  })
})