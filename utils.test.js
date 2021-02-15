import { assignmentString } from "./utils";

it("assigns strings", () => {
  expect(assignmentString("i", 7)).toBe("\ni = 7");
});
