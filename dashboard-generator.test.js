import { generateDashboardTerraformCode } from "./dashboard-generator";
import screenboardJSON from "./examples/screenboard.json";
import timeboardJSON from "./examples/timeboard.json";

it("converts screenboards correctly", () => {
  expect(generateDashboardTerraformCode("sb_1", screenboardJSON)).toMatchSnapshot();
});

it("converts timeboards correctly", () => {
  expect(generateDashboardTerraformCode("tb_1", timeboardJSON)).toMatchSnapshot();
});
