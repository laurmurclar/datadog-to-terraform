import { generateDashboardTerraformCode } from "./dashboard-converter";
import screenboardData from "./examples/screenboard.json";
import timeboardData from "./examples/timeboard.json";

it("converts screenboards correctly", () => {
  expect(generateDashboardTerraformCode("sb_1", screenboardData)).toMatchSnapshot();
});

it("converts timeboards correctly", () => {
  expect(generateDashboardTerraformCode("tb_1", timeboardData)).toMatchSnapshot();
});
