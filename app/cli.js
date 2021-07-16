import fs from "fs";
import { generateTerraformCode } from "./monitor-converter";
import { generateDashboardTerraformCode } from "./dashboard-converter";

const json = fs.readFileSync("/dev/stdin").toString();
const parsedJson = JSON.parse(json);
const resourceName = "replaceMeNow";

const terraformCode = parsedJson.hasOwnProperty("name")
  ? generateTerraformCode(resourceName, parsedJson)
  : generateDashboardTerraformCode(resourceName, parsedJson);

console.log(terraformCode);
