import { convert } from "./dashboard.js";
import dashboardData from "./examples/wip-dashboard.json";

it("converts", () => {
  expect(convert("sb_1", dashboardData)).toMatchSnapshot();
});
