import { login } from "../../page-class/login/login"
import { pettyCreation } from "../../page-class/pettyCreation";

const loginObj = new login();
const pettyCreationObj = new pettyCreation();
describe('CRT', () => {
  it('Petty Creation', () => {
    loginObj.performLogin();
    pettyCreationObj.createPettyDeposit();
    cy.pause();
  })
})