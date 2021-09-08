import { assignmentString, block, blockList, map } from "../app/utils";

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

it("converts a block", () => {
  const contents = { a_cool_key: "a cool value", another_key: "another value" };
  expect(block("my_block", contents, assignmentString)).toMatchInlineSnapshot(`
    "
    my_block {
    a_cool_key = \\"a cool value\\"
    another_key = \\"another value\\"
    }"
  `);
});

it("converts a block list", () => {
  const contents = [
    { a_cool_key: "a cool value", another_key: "another value" },
    { a_cool_key: "another cool value", another_key: "another ANOTHER value" },
  ];
  expect(blockList(contents, "my_block", assignmentString)).toMatchInlineSnapshot(`
    "

    my_block {
    a_cool_key = \\"a cool value\\"
    another_key = \\"another value\\"
    }
    my_block {
    a_cool_key = \\"another cool value\\"
    another_key = \\"another ANOTHER value\\"
    }"
  `);
});
