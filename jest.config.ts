import type { JestConfigWithTsJest } from 'ts-jest';

export default async (): Promise<JestConfigWithTsJest> => {
  return {
    preset: 'ts-jest/presets/default-esm', // or other ESM presets
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
      '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/test/__mocks__/fileMock.ts',
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
    transform: {
      // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
      // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          useESM: true,
          diagnostics: {
            ignoreCodes: [1343],
          },
          astTransformers: {
            before: [
              {
                path: 'node_modules/ts-jest-mock-import-meta',
                options: {
                  metaObjectReplacement: {
                    env: {
                      // Replicate as .env
                      VITE_ACCESS_KEY: 'test',
                      VITE_FAVOURITES_KEY: 'test',
                    },
                  },
                },
              },
            ],
          },
        },
      ],
    },
  };
};
