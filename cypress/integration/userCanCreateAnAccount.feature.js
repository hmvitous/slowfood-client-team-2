describe("User can create account", () => {
    beforeEach(() => {
      cy.server();
      cy.visit("/");
    });
    it("successfully", () => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/v1/auth/sign_up",
        response: "fixture:registration.json",
        headers: {
            uid: "user@mail.com"
        }
      });

      cy.get("#register").click();
      cy.get("#register-form").within(() => {
        cy.get("#name").type("Lau")
        cy.get("#email").type("user@mail.com");
        cy.get("#password").type("password");
        cy.get("#confirm-password").type("password")
        cy.get("button")
          .contains("Create")
          .click();
      });
      cy.get("#message").should("contain", "Account Created");
    });

    it("with invalid credentials", () => {
        cy.route({
            method: "POST",
            url: "http://localhost:3000/api/v1/auth/sign_up",
            status: "401",
            response: {
                errors: ["Invalid credentials. Please try again."],
                success: false
            }
        });
        cy.get("#register").click();
        cy.get("#register-form").within(() => {
            cy.get("#name").type("Lau");
            cy.get("#email").type("user@mail.com");
            cy.get("#password").type("password");
            cy.get("#confirm-password").type("wrongpassword");
            cy.get('button').contains('Create').click()
        });
        cy.get("#message").should("contain", "Invalid credentials. Please try again.");
    });







})