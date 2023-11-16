import { defineConfig } from "cypress";
import { plugins } from 'cypress-social-logins';
const googleSocialLogin = plugins.GoogleSocialLogin;

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'http://localhost:5556',
    experimentalModifyObstructiveThirdPartyCode: true,
    setupNodeEvents(on, config) {
      on('task', {
        GoogleSocialLogin: googleSocialLogin
      })
    },
  },
});
