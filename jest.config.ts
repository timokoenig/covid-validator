import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '^(.*)\\.[js|ts]$': '$1',
  },
  testEnvironment: 'jest-environment-node',
  transformIgnorePatterns: [
    'node_modules/(?!aggregate-error|clean-stack|escape-string-regexp|indent-string|p-map)',
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup-tests.js'],
}

export default config
