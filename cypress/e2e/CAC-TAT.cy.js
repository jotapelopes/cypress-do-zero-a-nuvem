/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('Verifica o título da aplicação', () => {
    cy.title().should('eq','Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)

    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Pedro')
    cy.get('#email').type('joao.lopes@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()
    //Resultado esperado
    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Pedro')
    cy.get('#email').type('joao.lopes#gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('Válida preenchimento inválido para o campo telefone', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Pedro')
    cy.get('#email').type('joao.lopes@gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('abcdefghijklmnopqrstuvwxyz', {delay: 0})
    cy.contains('button', 'Enviar').click()
    //Resultado esperado
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome e email', () => {
    cy.get('#firstName')
      .type('João')
      .should('have.value', 'João')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Pedro')
      .should('have.value', 'Pedro')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('joao.lopes@gmail.com')
      .should('have.value', 'joao.lopes@gmail.com')
      .clear()
      .should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    //Resultado esperado
    cy.get('.error').should('be.visible')
  })

  it('Envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'João',
      lastName: 'Pedro',
      email: 'joao.lopes@email.com',
      text: 'Teste...'
    }

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

})
