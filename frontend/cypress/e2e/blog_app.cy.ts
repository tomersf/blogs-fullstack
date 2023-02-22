describe("Blog app", function () {
  beforeEach(function () {
    cy.login("TestUser", "TestPass");
  });

  it("front page can be opened", function () {
    cy.contains("Welcome Back !");
  });

  it.only("login fails with wrong password", function () {
    cy.contains("log in").click();
    cy.get('input[placeholder="Username"]').type("TestUser");
    cy.get('input[placeholder="Password"]').type("WrongPass");
    cy.get("#login-submit-btn").click();

    cy.contains("Something went wrong!");
  });

  it("user can login", function () {
    cy.get("#login-change-form-btn").click();
    cy.get('input[placeholder="Username"]').type("TestUser");
    cy.get('input[placeholder="Password"]').type("TestPass");
    cy.get("#login-submit-btn").click();
  });

  it("a new blog can be created", function () {
    cy.get("#create-blog-menu-btn").click();
    cy.get('input[placeholder="Title"]').type("TestTitle");
    cy.get('input[placeholder="Author"]').type("TestAuthor");
    cy.get('input[placeholder="Url"]').type("www.test.com");
    cy.get("#create-blog-form-btn").click();
    cy.contains("Success!");
  });
});
