import fs from "fs";
import { generateTerraformCode } from "./monitor-converter";
import { generateDashboardTerraformCode } from "./dashboard-converter";

let json;
switch (process.argv.length) {
  case 2:
    json = fs.readFileSync("/dev/stdin").toString();
    break;
  case 3:
    json = fs.readFileSync(process.argv[2]).toString();
    break;
  default:
    console.error("Usage: \nyarn convert < somefile.json\nor\nyarn convert somefile.json");
    process.exit(1);
}
const parsedJson = JSON.parse(json);
const resourceName = "replaceMeNow";

const terraformCode = parsedJson.hasOwnProperty("name")
  ? generateTerraformCode(resourceName, parsedJson)
  : generateDashboardTerraformCode(resourceName, parsedJson);

console.log(terraformCode);
