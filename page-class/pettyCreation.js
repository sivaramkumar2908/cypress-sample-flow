export class pettyCreation{

    clickMenu(name) {
        cy.get('.ant-menu-title-content').contains(name).click({ force: true });
    }
    
    navigateToPettyDeposit() {
        this.clickMenu('Opex');
        this.clickMenu('Petty');
        this.clickMenu('Petty deposit');
    }

    createPettyDeposit() {
        cy.then(() => {
            this.navigateToPettyDeposit();
            cy.wait(1000);
            cy.waitForElementToDisappear(`._loading_overlay_spinner`);
        })
        .then(() => {
            const subBU = 'POP';
            cy.contains('button', 'New deposit').click();
            cy.wait(1000);
            cy.waitForElementToDisappear(`._loading_overlay_spinner`);
            cy.get('#subBuId').type(subBU, { force: true });
            cy.get(`.[class=ant-select-item-option-content]:contains(${subBU})`).click({ force: true });
            cy.get('input[placeholder="Select date"]')
                .click()
                .type('2024-10-29')
                .type('{enter}');
            cy.get('input[placeholder="Please enter amount"]').type(10);
        })
    }
}