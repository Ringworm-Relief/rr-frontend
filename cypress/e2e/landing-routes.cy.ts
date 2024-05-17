// describe('Landing Page', () => {
//     beforeEach(() => {
//       cy.intercept('GET', 'https://8deefa6e-9aee-47e2-b8ea-a4dd591b3fc3.mock.pstmn.io/api/v1/users/1', {
//         statusCode: 200,
//         fixture: 'user'
//       }).as('GetUser')
//       .visit('http://localhost:3000/')
//     })

//     it('Should navigate to Calender from Nav', () => {
//         cy.get('a').eq(0).click()
//         cy.url().should('include', '/user/1/calendar')
//     })

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
// })