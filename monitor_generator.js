const REQUIRED_KEYS = ["name", "type", "query", "message"];

const ALLOWED_OPTIONS_KEYS = [
  "notify_no_data",
  "new_host_delay",
  "evaluation_delay",
  "no_data_timeframe",
  "renotify_interval",
  "notify_audit",
  "timeout_h",
  "include_tags",
  "require_full_window",
  "locked",
  "escalation_message",
  "thresholds",
  "silenced",
  "threshold_windows"
];

function literalString(value) {
  if (typeof value == "string") {
    if (value.includes("\n")) {
      return `<<EOF\n${value}\nEOF`;
    }
    return `"${value}"`;
  } else if (Array.isArray(value)) {
    let result = "[";
    value.forEach((elem, index) => {
      result += literalString(elem);
      if (index != value.length - 1) result += ",";
    });
    return result + "]";
  }
  return value;
}

export function assignmentString(key, value) {
  if (value === null) return "";
  const displayValue = literalString(value);
  return `${key} = ${displayValue}\n`;
}

export function convertMapping(mappingName, mapping) {
  let result = "\n";
  Object.entries(mapping).forEach(([key, value]) => {
    result += assignmentString(key, value);
  });
  return `${mappingName} {${result}}`;
}

function convertOptions(options) {
  let result = "";
  Object.entries(options).forEach(([key, value]) => {
    if (ALLOWED_OPTIONS_KEYS.includes(key)) {
      if (key === "thresholds" || key === "threshold_windows" || key === "silenced") {
        result += convertMapping(key, value);
      } else {
        result += assignmentString(key, value);
      }
    } else {
      throw `Conversion for "${key}" not found`;
    }
  });
  return result;
}

function convert(key, value) {
  let result = "";
  if (REQUIRED_KEYS.includes(key) || key === "tags") {
    result += assignmentString(key, value);
  } else if (key === "options") {
    result += convertOptions(value);
  } else {
    throw `Conversion for "${key}" not found`;
  }
  return result;
}

function monitorBody(monitorJson) {
  let result = "\n";

  Object.entries(monitorJson).forEach(([key, value]) => {
    result += convert(key, value);
  });

  return result;
}

export function generateTerraformCode(resourceName, monitorJson) {
  if (!resourceName || !monitorJson || !REQUIRED_KEYS.every(key => key in monitorJson)) {
    throw "You're missing a required key.";
  }
  return `resource "datadog_monitor" "${resourceName}" {${monitorBody(monitorJson)}}`;
}
