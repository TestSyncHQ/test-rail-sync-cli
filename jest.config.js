module.exports = {
  clearMocks: true,
  collectCoverageFrom: ["**/*.{ts,tsx}"],
  coverageDirectory: "coverage",
  displayName: "shared",
  preset: "ts-jest",
  roots: ["./"],
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec).[jt]s?(x)"],
};
