const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("../tsconfig.json");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "../",
  }),
  globals: {
    "ts-jest": {
      isolatedModules: compilerOptions.isolatedModules,
    },
  },
};