import { greet } from "./main";

describe("greet", () => {
  it("should greet the user", () => {
    const greeting = greet("World");
    expect(greeting).toBe("Hello, World!");
  });
});
