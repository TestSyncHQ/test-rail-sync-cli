// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { TestCase } from "../../definitions/test-case.definitions";
import {
  extractAllDescriptions,
  extractDescriptionsWithId,
  extractDescriptionsWithoutId,
  replaceDescriptions,
} from "../test-case.utils";

describe("getDescriptionsWithId", () => {
  it("should get descriptions with id from file content", () => {
    const fileContent = `
      test('1: This is a test description', async () => {});
      it('2 : Another test description', param => {});
      test("3:Yet another test",   () => {});
      it(" 467993: last test",() => {});
      test('test without id',async() => {});
      it("another test without id",param => {});
      describe("some describe", () => {
          it('5: nested test', (param) => {})
      })
    `;

    const expectedDescriptions = [
      ["1", "This is a test description"],
      ["2", "Another test description"],
      ["3", "Yet another test"],
      ["467993", "last test"],
      ["5", "nested test"],
    ];

    expect(extractDescriptionsWithId(fileContent)).toEqual(expectedDescriptions);
  });
});

describe("getDescriptionsWithoutId", () => {
  it("should get descriptions without id from file content", () => {
    const fileContent = `
      test('1: This is a test description', async () => {});
      it('2 : Another test description', param => {});
      test("   3:Yet another test",   () => {});
      it(" 4: last test",() => {});
      test('test without id',async() => {});
      it("another test without id",param => {});
      describe("some describe", () => {
          it('5: nested test', (param) => {})
      })
    `;

    const expectedDescriptions = [
      [undefined, "test without id"],
      [undefined, "another test without id"],
    ];

    expect(extractDescriptionsWithoutId(fileContent)).toEqual(expectedDescriptions);
  });
});

describe("getAllDescriptions", () => {
  it("should get all descriptions from file content", () => {
    const fileContent = `
      test('1: This is a test description', async () => {});
      it('2 : Another test description', param => {});
      test("3:Yet another test",   () => {});
      it(" 4: last test",() => {});
      test('test without id',async() => {});
      it("another test without id",param => {});
      describe("some describe", () => {
          it('5: nested test', (param) => {})
      })
    `;

    const expectedDescriptions = [
      ["1", "This is a test description"],
      ["2", "Another test description"],
      ["3", "Yet another test"],
      ["4", "last test"],
      [undefined, "test without id"],
      [undefined, "another test without id"],
      ["5", "nested test"],
    ];

    expect(extractAllDescriptions(fileContent)).toEqual(expectedDescriptions);
  });
});

describe("replaceDescriptions", () => {
  it("should replace test titles with matching IDs", () => {
    const fileContent = `
      test('1: Old title 1', async () => {});
      it('2: Old title 2', param => {});
    `;
    const testCases: TestCase[] = [
      { id: "1", title: "New title 1" },
      { id: "2", title: "New title 2" },
    ];
    const expectedOutput = `
      test('1: New title 1', async () => {});
      it('2: New title 2', param => {});
    `;
    expect(replaceDescriptions(fileContent, testCases)).toBe(expectedOutput);
  });

  it("should replace test titles with matching titles and add IDs", () => {
    const fileContent = `
      test('Old title 3', async () => {});
      it('Old title 4', param => {});
    `;
    const testCases: TestCase[] = [
      { id: "3", title: "Old title 3" },
      { id: "4", title: "Old title 4" },
    ];
    const expectedOutput = `
      test('3: Old title 3', async () => {});
      it('4: Old title 4', param => {});
    `;
    expect(replaceDescriptions(fileContent, testCases)).toBe(expectedOutput);
  });

  it("should not replace titles if no matching test cases are found", () => {
    const fileContent = `
      test('5: Old title 5', async () => {});
      it('Old title 6', param => {});
    `;
    const testCases: TestCase[] = [
      { id: "7", title: "New title 7" },
      { id: "8", title: "New title 8" },
    ];
    expect(replaceDescriptions(fileContent, testCases)).toBe(fileContent);
  });

  it("should handle mixed cases with and without IDs", () => {
    const fileContent = `
      test('9: Old title 9', async () => {});
      it('Old title 10', param => {});
      test('11: Old title 11', async () => {});
    `;
    const testCases: TestCase[] = [
      { id: "9", title: "New title 9" },
      { id: "10", title: "Old title 10" },
      { id: "11", title: "New title 11" },
    ];
    const expectedOutput = `
      test('9: New title 9', async () => {});
      it('10: Old title 10', param => {});
      test('11: New title 11', async () => {});
    `;
    expect(replaceDescriptions(fileContent, testCases)).toBe(expectedOutput);
  });

  it("should handle empty test case array", () => {
    const fileContent = `
            test('1: Old title 1', async () => {});
            it('Old title 2', param => {});
        `;
    const testCases: TestCase[] = [];
    expect(replaceDescriptions(fileContent, testCases)).toBe(fileContent);
  });

  it("should handle empty file content", () => {
    const fileContent = "";
    const testCases: TestCase[] = [{ id: "1", title: "test" }];
    expect(replaceDescriptions(fileContent, testCases)).toBe(fileContent);
  });

  it("should handle cases where Id exists but title is the same", () => {
    const fileContent = `
            test('1: Old title 1', async () => {});
        `;
    const testCases: TestCase[] = [{ id: "1", title: "Old title 1" }];
    expect(replaceDescriptions(fileContent, testCases)).toBe(fileContent);
  });
});
