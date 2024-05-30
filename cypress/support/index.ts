Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore the error related to 'Token is null'
    // Return false to prevent Cypress from failing the test
    if (err.message.includes('Token is null')) {
      return false;
    }
    // Allow other errors to fail the test
    return true;
  });