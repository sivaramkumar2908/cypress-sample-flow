const { defineConfig } = require("cypress");
module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 80000,
  experimentalSessionAndOrigin: true,
  pageLoadTimeout: 90000,
  redirectionLimit: 500,
  requestTimeOut: 50000,
  responseTimeout: 80000,
  retries: 0,
  env: {
    crtPanelUrl: 'https://fin.shopups1.xyz/',
    financeAdminPanelUrl: 'https://finap.shopups2.xyz/',
    commercePanelUrl: 'https://mokamap.shopups2.xyz/',
    dasPanelUrl: 'https://dasap.shopups2.xyz/',
    ucwmsUrl: 'https://ucwms.shopups2.xyz/',
    bakiJupiterUrl: 'https://baki.shopups1.xyz/api/jupiter/',
    bakiPanelUrl: 'https://baki.shopups1.xyz/',
    bakiCheckerPanelUrl: 'https://baki.shopups1.xyz/maker-checker',
    redxMerchantWebUrl: 'https://redx.shopups1.xyz/',
    redxSapPanelUrl: 'https://sap.shopups1.xyz/',
    redxAdminPanelUrl: 'https://redxadmin.shopups1.xyz/',
    CONTENT_MANAGEMENT_TOOL_STAGE_BASE_URL: 'https://mokamapi.shopups2.xyz/products',
    serviceCallBaseUrl: 'https://mokamapi.shopups2.xyz/',
    ucApiUrl: 'https://ucapi.shopups2.xyz/',
    platformAdminPanelUrl: 'https://fin.shopups2.xyz/',
  },

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (["chrome", "edge"].includes(browser.name)) {
          if (browser.isHeadless) {
            launchOptions.args.push("--no-sandbox");
            launchOptions.args.push("--disable-gl-drawing-for-tests");
            launchOptions.args.push("--disable-gpu");
            launchOptions.args.push("--js-flags=--max-old-space-size=4096");
          }
        }
        return launchOptions;
      });

    },
    experimentalMemoryManagement: true,
    testIsolation: false,
    specPattern: './cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    trashAssetsBeforeRuns: false,
    downloadsFolder: 'cypress/downloads',
    video: true,
  },
});
