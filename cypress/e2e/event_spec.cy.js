import {getCurrentDate} from '../../src/utils/currentDate';
import { uuid } from 'uuidv4';

describe('Adding Event', () => {
    it('User should be able to fill all inputs and add an event', () => {
      //visit the page
      cy.visit('http://localhost:3000/');
      //fill all inputs
      const eventData = {
        firstName: 'test',
        lastName: uuid(),
        email: 'test@test.pl',
        date: getCurrentDate()
      };

      cy.findByPlaceholderText(/First Name/i).type(eventData.firstName);
      cy.findByPlaceholderText(/Last name/i).type(eventData.lastName);
      cy.findByPlaceholderText(/e-mail/i).type(eventData.email);
      cy.get('[data-testid="date-event"]').type(eventData.date);
      //click submit button
      cy.get('[data-testid="submit-event"]').click();
      //close success notification
      cy.get('.notification > p').should('contains',/Event has been added/i);
      cy.get('.notification > button').click()
      //check for event
      cy.findByText(`${eventData.firstName} ${eventData.lastName}`);
    })

    it('User should not be able add an event if inputs are not filled', () => {
      //fill all inputs
      const eventsData = [{
        firstName: 'test',
        lastName: uuid(),
        email: 'test@test.pl'
      },
      {
        firstName: 'test',
        lastName: uuid(),
        date: getCurrentDate()
      },
      {
        firstName: 'test',
        email: 'test@test.pl',
        date: getCurrentDate()
      },
      {
        lastName: uuid(),
        email: 'test@test.pl',
        date: getCurrentDate()
      }];

      eventsData.forEach(event => {
        cy.visit('http://localhost:3000/');

        if(event.firstName)cy.findByPlaceholderText(/First Name/i).type(event.firstName);
        if(event.lastName)cy.findByPlaceholderText(/Last name/i).type(event.lastName);
        if(event.email)cy.findByPlaceholderText(/e-mail/i).type(event.email);
        if(event.date)cy.get('[data-testid="date-event"]').type(event.date);

        //click submit button
        cy.get('[data-testid="submit-event"]').click();

        //input should be focused
        cy.get('input:focus');
      })
    })
  })