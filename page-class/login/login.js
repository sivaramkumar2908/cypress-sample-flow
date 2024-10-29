export class login {

    initApi() {
        return cy.request({
            method: 'POST',
            url: `${Cypress.env('crtPanelUrl')}auth/v0/login/phone/init/`,
            body: {
                phone: '8801877755522'
            }
        })
        .then((response) => {
            cy.log(`${response.status}`)
        })
    }

    submitOtp() {
        return cy.request({
            method: 'POST',
            url: `${Cypress.env('crtPanelUrl')}auth/v0/login/phone`,
            body: {
                phone: '8801877755522',
                code: '6666'
            }
        })
        .then((response) => {
            cy.log(`${response.status}`);
            expect(response.status).to.eq(200);
            Cypress.env('AUTH_BEARER_TOKEN', 'Bearer ' + response.body.data.token);
            Cypress.env('CRT_AUTH_COOKIE', response.headers['set-cookie'][0]);    
        })
    }

    crtCookieSet() {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('crtPanelUrl')}crt/authenticate`,
            body: {
              accessToken: `${Cypress.env('AUTH_BEARER_TOKEN')}`,
            },
        }).then((authenticateResponse) => {
            let persistObject = {
              auth: JSON.stringify({ user: authenticateResponse.body.data }),
            };
            window.localStorage.setItem(
              'persist:crt',
              JSON.stringify(persistObject)
            );
            let cookieFromResponse = authenticateResponse.requestHeaders.cookie;
            let splitIndex = cookieFromResponse.indexOf('=');
            cy.setCookie(
              cookieFromResponse.substring(0, splitIndex),
              cookieFromResponse.substring(splitIndex + 1).split(';')[0],
              { path: '/' }
            ).then(() => {
              cy.visit(Cypress.env('crtPanelUrl'));
            });
            cy.getCookie(cookieFromResponse.substring(0, splitIndex)).should(
              'exist'
            );
            Cypress.env('crtUserId', authenticateResponse.body.data.userId);
        });
    }

    selectRoleFromPopup(roleName, buName) {
        cy.get('.ant-modal-root').then(($element) => {
          if ($element.find(`button[type=button]:contains(Refresh)`).length > 0) {
            cy.get("button[type=button]:contains(Refresh)").click();
          } else {
            cy.log('Refresh button not found. Skipping click action.');
          }
        // });
        // cy.get(`.ant-modal-root`).then(($element) => {
          if (
            $element.find(`button[type=button]:contains(${roleName} | ${buName})`)
              .length > 0
          ) {
            cy.get(`button[type=button]:contains(${roleName} | ${buName})`).first().click();
          } else {
            cy.log('Role selection not found. Skipping click action.');
          }
        })
        .then(() => {
            cy.waitForElementToDisappear(`._loading_overlay_spinner`);
            cy.get('button[aria-label=Close]').click();
            cy.waitForElementToDisappear(`._loading_overlay_spinner`);
        });
        
    }

    selectRole() {
        cy.get('span[class=ant-select-selection-item]')
            .invoke('attr', 'title')
            .then((roleValue) => {
                // (uncaught exception)Error: ResizeObserver loop completed with undelivered notifications.
                // on clicking Dropdown from UI, we are getting above error and it is causing memory issue in Cypress. So Handled role switch with API.
                    cy.waitForElementToDisappear(`._loading_overlay_spinner`);
                    cy.get('span[class="ant-select-selection-search"]').realMouseDown();
                    cy.wait(1000);
                    cy.get('input.ant-select-selection-search-input')
                        .eq(0)
                        .clear({ force: true })
                        .type(value.roleName, { force: true });
                    cy.contains(
                        '.ant-select-dropdown .ant-select-item',
                        `${value.roleName} | ${value.buName}`
                    ).click({ force: true });
                    if (value.roleName == 'Cash Officer') {
                        cy.wait(1000);
                        /*cy.xpath(
                        `//*[@class='ant-typography layout_hubText__vyI9p']//child::strong`
                        )
                        .invoke('text')
                        .then((text) => {
                            cy.task('printInConsole', text);
                            apiRequestObj.profileApi();
                            cy.then(() => {
                            return getHubNameForUser(Cypress.env('userId')).then(
                                (result) => {
                                expect(result[0].name.toString()).to.equal(text);
                                }
                            );
                            });
                        });*/
                    }
            });
    }

    performLogin() {
        cy.then(() => {
            cy.visit(Cypress.env('crtPanelUrl'));
        })
        .then(() => {
            this.initApi();
        })
        .then(() => {
            this.submitOtp();
        })
        .then(() => {
            this.crtCookieSet();
            cy.wait(2000);
        })   
        .then(() => {
            this.selectRoleFromPopup('Cash Officer', 'UDH');
        })
    }
}