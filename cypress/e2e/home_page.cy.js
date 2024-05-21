/* eslint-disable */

describe('Login flow', () => {
    it('successfully login to an account that DOES NOT exists', () => {
        cy.visit('/');
        cy.get('.center-button > .MuiButtonBase-root').click();

        cy.origin('https://dev-1qptdla0pgqbqxfn.us.auth0.com', () => {
            cy.contains('Log in to dev-1qptdla0pgqbqxfn to continue to SharedGroceryList.');
            cy.get('input[name="username"]').type("aaaaaa@account.com");
            cy.get('input[name="password"]').type("wrongpassword");
            cy.get('button[name="action"]').click();

            cy.contains('Wrong email or password');
        });

    });
    it('successfully login to an account that DOES exists', () => {
        cy.visit('/');
        cy.get('.center-button > .MuiButtonBase-root').click();

        cy.login('test@account.com', '&jS;;4RaZv~h**5');

        cy.contains('button', 'Mijn lijsten');
    });
});

describe('After login', () => {
    it('successfully add an item to an existing account', () => {
        cy.login('appel@gmail.com', 'CF5UnRy2uk*tdAEfMt4*Vv2DgUY');
        cy.contains('Rows per page:');
        cy.get('#outlined-basic').type("List Z");
        cy.get('form > .MuiButtonBase-root').click();
        cy.get('#outlined-basic').type(" ");
        cy.contains('button', 'Refresh').click();
        cy.contains('List Z');
    });

    it('successfully open an existing list', () => {
        cy.login('appel@gmail.com', 'CF5UnRy2uk*tdAEfMt4*Vv2DgUY');
        cy.contains('Rows per page:');
        cy.contains('button', 'Refresh').click();
        cy.contains('List Z').click();
        cy.contains('Hoeveelheid');
    });

    it('successfully add an item to a list', () => {
        cy.login('appel@gmail.com', 'CF5UnRy2uk*tdAEfMt4*Vv2DgUY');
        cy.contains('Rows per page:');
        cy.contains('button', 'Refresh').click();
        cy.contains('List Z').click();
        cy.contains('Hoeveelheid');
        cy.get(':nth-child(1) > .MuiInputBase-root > #outlined-basic').type("Appel");
        cy.get(':nth-child(2) > .MuiInputBase-root > #outlined-basic').type("1");
        cy.get(':nth-child(3) > form > .MuiButtonBase-root').click();
        cy.get(':nth-child(1) > .MuiInputBase-root > #outlined-basic').type(" ");
        cy.contains('button', 'Refresh').click();
        cy.contains('Appel');
    });

    it('successfully log out', () => {
        cy.login('appel@gmail.com', 'CF5UnRy2uk*tdAEfMt4*Vv2DgUY');
        cy.get('.MuiAvatar-root').click();
        cy.contains('button', 'Mijn lijsten');
        cy.get('.MuiList-root > :nth-child(3) > .MuiButtonBase-root').click();
        cy.contains('Log in om toegang te krijgen tot alle functionaliteit.');
    })
});