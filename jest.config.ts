import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.+(test.ts)'],
  clearMocks: true,
  transform: {
    '^.+\\.ts$': ['ts-jest', { isolatedModules: true }]
  }
};

export default config;
