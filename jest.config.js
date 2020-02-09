module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: ['<rootDir>/**/*.test.js?(x)']
}
