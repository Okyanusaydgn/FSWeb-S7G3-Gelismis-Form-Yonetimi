describe("Form sayfası testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Name alanına yazı yaz", () => {
    cy.get("input[name=name]").type("Ali");
    cy.get("input[name=name]").should("have.value", "Ali"); //.should assertion un amacı bu text in içinde "Ali" isimli text olmalı.input olduğu için bu yapı; have.text yerine have.value yazdık
  });


  it("Email alanına mail adresi yazın", () => {
    cy.get("input[name=name]").type("Ali");
    cy.get("input[name=email]").type("Ali@veli.com");
    cy.get("input[name=password]").type("123456");
    cy.get("input[name=terms]").check();
    cy.get("input[name=terms]").should("be.checked"); 

    cy.get("#user-form-btn").should("be.enabled"); 
    cy.get("#user-form-btn").click();
  });
//   it("displays two todo items by default", () => {});
//   it("displays two todo items by default", () => {});
//   it("displays two todo items by default", () => {});
//   it("displays two todo items by default", () => {});
//   it("displays two todo items by default", () => {});
//   it("displays two todo items by default", () => {});
//   it("displays two todo items by default", () => {});
});
