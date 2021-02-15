import { generateDashboardTerraformCode } from "./dashboard";
import screenboardData from "./examples/screenboard.json";
import timeboardData from "./examples/timeboard.json";

it("converts screenboards correctly", () => {
  expect(generateDashboardTerraformCode("sb_1", screenboardData)).toMatchSnapshot();
});

it("converts timeboards correctly", () => {
  expect(generateDashboardTerraformCode("tb_1", timeboardData)).toMatchSnapshot();
});

it("throws an error if not given a resource name", () => {
  expect(() => {
    generateDashboardTerraformCode(undefined, timeboardData);
  }).toThrow("You're missing a required key");
});

it("throws an error if not given dashboard data", () => {
  expect(() => {
    generateDashboardTerraformCode("tb_1", undefined);
  }).toThrow("You're missing a required key");
});
