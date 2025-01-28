Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'John',
    lastName: 'Peter',
    email: 'johnpeter@gmail.com',
    text: 'testando'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text, {delay: 0})
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
})