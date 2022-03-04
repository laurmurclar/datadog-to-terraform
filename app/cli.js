/**
 Straightforward CLI util to convert a json returned by datadog API into a terraform file

 brew install node
 brew install terraform

 export QUERY="search-query"
 curl -X GET "https://api.datadoghq.com/api/v1/monitor/search?query=${QUERY}" \
 -H "Content-Type: application/json" \
 -H "DD-API-KEY: ${DD_API_KEY}" \
 -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" | jq ".monitors[].id" > monitors.list

 for monitor_id in $(cat monitors.list); do
     curl -X GET "https://api.datadoghq.com/api/v1/monitor/${monitor_id}" \
     -H "Content-Type: application/json" \
     -H "DD-API-KEY: ${DD_API_KEY}" \
     -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" > ${monitor_id}.json
 done

 for monitor_id in $(cat monitors.list); do
    cat ${monitor_id}.json | node ~/github/datadog-to-terraform/app/cli.js
 done

 # Apply formatting 💅
 terraform fmt

 */

import { generateTerraformCode } from "./monitor-converter.js";
import * as fs from "fs";

let data = fs.readFileSync(process.stdin.fd, "utf-8");
let parsedJson = JSON.parse(data);
if (!parsedJson.hasOwnProperty("name")) {
  throw new Error("Not a datadog json");
}
function removeNulls(obj) {
  Object.keys(obj).forEach(function (key) {
    (obj[key] && typeof obj[key] === "object" && removeNulls(obj[key])) ||
      (obj[key] === null && delete obj[key]);
  });
  return obj;
}
parsedJson = removeNulls(parsedJson);

// Standardize the name
const resourceName = parsedJson["name"]
  .toLowerCase()
  .replaceAll(" ", "_")
  .replaceAll("*", "x")
  .replace(new RegExp(/[^0-9a-z_-]/, "g"), "")
  .trim();

let orderedJson = {
  name: parsedJson.name,
  type: parsedJson.type,
  query: parsedJson.query,
  message: parsedJson.message,
  tags: parsedJson.tags,
};
for (let key in parsedJson) {
  if (!orderedJson.hasOwnProperty(key)) {
    orderedJson[key] = parsedJson[key];
  }
}

let terraformCode = generateTerraformCode(resourceName, orderedJson);

fs.writeFileSync(`${resourceName}.tf`, terraformCode);

console.log(terraformCode);
