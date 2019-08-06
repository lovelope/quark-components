module.exports = {
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
  },
  verbose: true,
};
