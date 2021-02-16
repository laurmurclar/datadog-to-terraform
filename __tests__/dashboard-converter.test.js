import { generateDashboardTerraformCode } from "../app/dashboard-converter";
import screenboardData from "../examples/screenboard.json";
import timeboardData from "../examples/timeboard.json";
import dashboardWithGroupData from "../examples/dashboard-with-group.json";
import badDashboardData from "../examples/bad-dashboard.json";

it("converts screenboards correctly", () => {
  expect(generateDashboardTerraformCode("sb_1", screenboardData)).toMatchSnapshot();
});

it("converts timeboards correctly", () => {
  expect(generateDashboardTerraformCode("tb_1", timeboardData)).toMatchSnapshot();
});

it("converts dashboards with groups correctly", () => {
  expect(
    generateDashboardTerraformCode("group_db_1", dashboardWithGroupData)
  ).toMatchSnapshot();
});

it("throws an error if a key cannot be converted", () => {
  expect(() => {
    generateDashboardTerraformCode("bad_data", badDashboardData);
  }).toThrow("Can't convert key 'NOT_A_REAL_KEY'");
});
