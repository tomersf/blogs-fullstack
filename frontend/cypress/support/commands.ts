/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

declare global {
  namespace Cypress {
    interface Chainable {
      register(title: string, author: string): Chainable<void>;
      login(username: string, password: string): Chainable<void>;
      createBlog(title: string, author: string, url: string): Chainable<void>;
      //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
      //   dismiss(
      //     subject: string,
      //     options?: Partial<TypeOptions>
      //   ): Chainable<Element>;
      //   visit(
      //     originalFn: CommandOriginalFn,
      //     url: string,
      //     options: Partial<VisitOptions>
      //   ): Chainable<Element>;
    }
  }
}

Cypress.Commands.add("register", (username, password) => {
  cy.request("POST", `${Cypress.env("BACKEND_REGISTER")}`, {
    username,
    password,
  }).then(({}) => {});
});

Cypress.Commands.add("login", (username, password) => {
  cy.request("POST", `${Cypress.env("BACKEND_LOGIN")}`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("token", JSON.stringify(body));
    cy.visit("");
  });
});

Cypress.Commands.add("createBlog", (title, author, url) => {
  cy.request({
    url: `${Cypress.env("BACKEND_BLOGS")}`,
    method: "POST",
    body: { title, author, url },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("token")).token
      }`,
    },
  });

  cy.visit("");
});

export {};
