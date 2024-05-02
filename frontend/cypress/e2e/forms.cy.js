import 'cypress-file-upload';

describe('Forms Testing', () => {
  it('Registers a new user', () => {
    cy.visit({
    //   url: '/signup',
      url: '/login',
      failOnStatusCode: false
    })
    const mail = 'amoiz.bscs22seecs@seecs.edu.pk'
    const password = 'password'
    // cy.get('input[name="name"]').as('name')
    cy.get('input[name="email"]').as('email')
    cy.get('input[name="password"]').as('password')

    // cy.get('@name').type('Testing User');
    cy.get('@email').type(mail);
    cy.get('@password').type(password);
    // cy.get('input[type="file"]').attachFile('../../assets/success.jpeg');
    cy.get('button[type="submit"]').click();
    cy.get('[role="alert"]').should('be.visible');
    
  })
})
