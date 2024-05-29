describe('Landing Page', () => {
    beforeEach(() => {
      cy.intercept('POST', 'https://rr-users-calendars-service-3e13398e3ea5.herokuapp.com/api/v1/users/login', {
        statusCode: 200,
        fixture: 'user'
      }).as('GetUser')
      .visit('http://localhost:3000/')
      .get('.MuiPaper-root').first().within(() => {
        cy.get('button').last().should('have.text', 'Sign In').click()
      })
      cy.get('input').eq(0).type('test25@test.com')
      .get('input').eq(1).type('password')
      .get('button').eq(0).click()
    })

    it('Should navigate to Calender from Nav', () => {
        cy.get('a').eq(0).click()
        cy.url().should('include', '/user/1/calendar')
    })

//     it('Should navigate to Dashboard from Nav', () => {
//         cy.get('a').eq(1).click()
//         cy.url().should('include', '/user/1/dashboard')
//     })

//     it('Should navigate to Education from Nav', () => {
//         cy.get('a').eq(2).click()
//         cy.url().should('include', '/education')
//     })

//     it('Should navigate to Sign In from Drawer', () => {
//         cy.get('.css-zylse7-MuiButtonBase-root-MuiIconButton-root').click()
//         cy.get('.MuiDrawer-paper').within(() => {
//           cy.get('.MuiListItemButton-root').eq(0).click()
//         })
//         cy.url().should('include', '/signin')
//     })

//     it('Should navigate to Dashboard from Drawer', () => {
//         cy.get('.css-zylse7-MuiButtonBase-root-MuiIconButton-root').click()
//         cy.get('.MuiDrawer-paper').within(() => {
//           cy.get('.MuiListItemButton-root').eq(1).click()
//         })
//         cy.url().should('include', '/user/1/dashboard')
//     })

//     it('Should navigate to Calendar In from Drawer', () => {
//         cy.get('.css-zylse7-MuiButtonBase-root-MuiIconButton-root').click()
//         cy.get('.MuiDrawer-paper').within(() => {
//           cy.get('.MuiListItemButton-root').eq(1).click()
//         })
//         cy.url().should('include', '/user/1/calendar')
//     })

//     it('Should navigate to Saved Articles from Drawer', () => {
//         //Add tests after saved articles is created
//     })

//     it('Should navigate to Article', () => {
//         //Add tests after landing articles have been updated
//     })

//     it('Should navigate to Article ', () => {
//           //Add tests after landing articles have been updated
//     })

//     it('Should navigate to Article', () => {
//           //Add tests after landing articles have been updated
//     })
})