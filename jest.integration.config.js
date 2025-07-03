const base = require('./jest.config');
module.exports = {
  ...base,
  testMatch: ['**/__tests__/api/**/*.spec.ts'],
};
