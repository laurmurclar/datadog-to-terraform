import { assignmentString } from "./monitor_generator.js";
import { convertMapping } from "./monitor_generator.js";

const REQUIRED_KEYS = [
  "title",
  "description",
  "template_variables",
  "layout_type",
  "is_read_only",
  "notify_list",
  "id",
];
const VALID_SLO_KEYS = [
  "view_type",
  "slo_id",
  "show_error_budget",
  "view_mode",
  "time_windows",
  "title",
  "title_size",
  "title_align",
];

export function generateDashboardTerraformCode(resourceName, dashboardJson) {
  if (!resourceName || !dashboardJson) {
    throw "You're missing a required key.";
  }
  return `resource "datadog_dashboard" "${resourceName}" {${dashboardBody(dashboardJson)}}`;
}

function dashboardBody(dashboardJson) {
  let result = "\n";

  Object.entries(dashboardJson).forEach(([key, value]) => {
    result += convert(key, value);
  });

  return result;
}

function convert(key, value) {
  let result = "";
  if (REQUIRED_KEYS.includes(key)) {
    if (key === "id") return result;
    if (key === "template_variables") {
      return result + convertArrayOfObjects(key, value);
    }
    result += assignmentString(key, value);
  } else if (key === "widgets") {
    result += convertWidgets(value);
  } else {
    throw `Conversion for "${key}" not found`;
  }
  return result;
}

function convertArrayOfObjects(arrayName, jsonArray) {
  let result = "\n";

  for (let obj of jsonArray) {
    result += singularize(arrayName) + " {\n";

    Object.entries(obj).forEach(([key, value]) => {
      result += assignmentString(key, value);
    });
    result += "\n}";
  }
  return result;
}

function convertWidgets(widgets) {
  let result = "";
  for (let widget of widgets) {
    result += "widget {\n";

    Object.entries(widget).forEach(([key, value]) => {
      if (key === "definition") {
        result += constructWidgetDefinition(value);
      } else if (key === "layout") {
        result += convertNestedMappings(key, value);
      }
    });
    result += "\n}";
  }
  return result;
}

function constructWidgetDefinition(definition) {
  let result = "\n";
  if (definition["type"] === "slo") {
    result += "service_level_objective_definition {\n";
  } else {
    result += definition["type"] + "_definition {\n";
  }
  Object.entries(definition).forEach(([key, value]) => {
    // Needed to exclude the SLO properties that are not accepted in the terraform code
    if (key === "type" || (definition["type"] === "slo" && !VALID_SLO_KEYS.includes(key))) {
      return;
    }
    if (key === "time") {
      result += convertNestedMappings(key, value);
    } else if (key === "widgets") {
      result += convertWidgets(value);
    } else if (key === "requests") {
      result += convertRequests(key, value);
    } else if (key === "markers") {
      result += convertArrayOfObjects(key, value);
    } else if (key === "yaxis") {
      result += convertMapping(key, value);
    } else {
      result += assignmentString(key, value);
    }
  });
  return result + "\n}";
}

function convertRequests(name, requests) {
  let result = "\n";
  for (let request of requests) {
    result += singularize(name) + " {\n";

    Object.entries(request).forEach(([key, value]) => {
      if (key === "style") {
        result += convertMapping(key, value);
      } else {
        result += assignmentString(key, value);
      }
    });
    result += "\n}";
  }
  return result;
}

function convertNestedMappings(mappingName, mapping) {
  let result = "\n";

  Object.entries(mapping).forEach(([key, value]) => {
    result += assignmentString(key, value);
  });
  return `${mappingName} = {${result}}`;
}

function singularize(str) {
  return str.replace(/s$/, "");
}
