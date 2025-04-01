module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  roots: ["./"],
  setupFilesAfterEnv: ["<rootDir>/src/config/jest.config.ts"],
  testEnvironment: "node",
  testMatch: ["**/__test__/?(*.)+(spec).ts?(x)"],
};
