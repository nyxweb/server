module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/tests/.*|(\\.|/)(test))\\.[jt]sx?$',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  }
};
