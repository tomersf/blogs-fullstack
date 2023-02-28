before(function () {
  cy.register("TestUser", "TestPass");
});

describe("Login Page", function () {
  beforeEach(function () {
    cy.visit("/");
  });

  it("Login form is shown", function () {
    cy.contains("Welcome Back !");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#login-change-form-btn").click();
      cy.get("#login-username-btn").type("TestUser");
      cy.get("#login-password-btn").type("TestPass");
      cy.get("#login-submit-btn").click();
      cy.contains("Welcome TestUser");
    });

    it("fails with wrong credentials", function () {
      cy.get("#login-change-form-btn").click();
      cy.get("#login-username-btn").type("TestUser123");
      cy.get("#login-password-btn").type("TestPass123");
      cy.get("#login-submit-btn").click();
      cy.contains("Something went wrong!");
    });
  });
});

describe("When Logged In", function () {
  beforeEach(function () {
    cy.resetTestUserData();
    cy.login("TestUser", "TestPass");
    cy.get("#login-change-form-btn").click();
    cy.get("#login-username-btn").type("TestUser");
    cy.get("#login-password-btn").type("TestPass");
    cy.get("#login-submit-btn").click();
  });

  // it.only("login fails with wrong password", function () {
  //   cy.contains("log in").click();
  //   cy.get('input[placeholder="Username"]').type("TestUser");
  //   cy.get('input[placeholder="Password"]').type("WrongPass");
  //   cy.get("#login-submit-btn").click();

  //   cy.contains("Something went wrong!");
  // });

  it("a new blog with valid data can be created", function () {
    cy.get("#create-blog-menu-btn").click();
    cy.get('input[placeholder="Title"]').type("TestTitle");
    cy.get('input[placeholder="Author"]').type("TestAuthor");
    cy.get('input[placeholder="Url"]').type("www.test.com");
    cy.get("#create-blog-form-btn").click();
    cy.contains("Success!");
  });
});
