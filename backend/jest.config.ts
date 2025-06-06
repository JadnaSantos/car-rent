import { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: "node",
  moduleNameMapper: {
    '^@prisma/client$': '<rootDir>/test/prisma-client.ts'
  }
};

export default config;
