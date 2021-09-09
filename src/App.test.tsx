import React from 'react';
import { mount } from '@cypress/react';
import App from './App';

it('Does page have title', () => { 
    mount(<App />);
    cy.get('body').then(($el) => {
        
        Cypress.dom.isDom($el) // true
    })
  cy.get('h1').contains('Rick & Morty API');
});

it('Testing searchbar', () => {
    mount(<App />);
    cy.get('[class=search-bar]').type('Rick{enter}');
});
it('Check Content of cards', () => {
    mount(<App />);
    cy.get('[class=Character-Card]').find("img").should('be.visible');
    console.log("img visible")
    cy.get('[class=Character-Card]').find('[class=Content-Holder]>h2');
    console.log("title visible")
    cy.get('[class=Character-Card]').find('[class=List-Element]');
    console.log("desc visible")
    
});
it('Check State Change on Pagination', () => {
    mount(<App />);
    cy.get('.Pagination-Button:last-of-type').click()
    
});

it('Calls the API And gets positive response', () => {
    mount(<App />);
    cy.request({
        url: 'https://rickandmortyapi.com/api/character',
        method: 'GET'
      })
});





