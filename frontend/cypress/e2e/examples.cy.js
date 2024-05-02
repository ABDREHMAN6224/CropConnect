describe('Different Examples', () => {
  it('multi page visit', () => {
    // first login
    cy.visit({
      url: '/login',
      failOnStatusCode: false
    })
    const mail = 'amoiz.bscs22seecs@seecs.edu.pk'
    const password = 'password'
    cy.get('input[name="email"]').as('email')
    cy.get('input[name="password"]').as('password')
    cy.get('@email').type(mail);
    cy.get('@password').type(password);
    cy.get('button[type="submit"]').click();
    cy.get('[role="alert"]').should('be.visible');

    cy.getDataTest('community').click()
    cy.location('pathname').should('eq', '/community')

    cy.getDataTest('resources').click()
    cy.location('pathname').should('eq', '/resources')

    cy.getDataTest('marketplace').click()
    cy.location('pathname').should('eq', '/marketplace')
})

it('intercept', () => {
    cy.intercept('GET', 'http://localhost:5000/events/past', {
        body: [
            { name: 'Event 1', date: '2021-10-10',users:[],_id:'1',guests:[] },
            { name: 'Event2', date: '2021-10-11',users:[],_id:'2',guests:[] },
            { name: 'Event3', date: '2021-10-12',users:[],_id:'3',guests:[] },
        ],
    })
    cy.intercept('GET', 'http://localhost:5000/events/upcoming', {
        body: [
            { name: 'Event 1', date: '2021-10-10',users:[],_id:'1',guests:[] },
            { name: 'Event2', date: '2021-10-11',users:[],_id:'2',guests:[] },
            { name: 'Event3', date: '2021-10-12',users:[],_id:'3',guests:[] },
        ],
    })
    cy.visit({
        url: '/events',
        failOnStatusCode: false
    })
})

})
