import { assignmentString, map } from "../app/utils";

it("assigns strings", () => {
  expect(assignmentString("i", 7)).toBe("\ni = 7");
});

it("maps contents", () => {
  const contents = { a_cool_key: "a cool value", another_key: "another value" };
  expect(map(contents, assignmentString)).toMatchInlineSnapshot(`
    "
    a_cool_key = \\"a cool value\\"
    another_key = \\"another value\\""
  `);
});
