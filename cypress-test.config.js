const { defineConfig } = require("cypress");

module.exports = defineConfig({
    env: {
        crtPanelUrl: 'https://fin.shopups1.xyz/',
    },
    e2e: {
        setupNodeEvents(on, config) {
          
        },
        specPattern: './cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
        trashAssetsBeforeRuns: false,
        downloadsFolder: "cypress/downloads",
        testIsolation: false,
    },
});