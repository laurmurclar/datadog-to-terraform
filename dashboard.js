import { assignmentString, convertLeafBlock } from "./utils";

const DASHBOARD = {
  layout_type: (v) => assignmentString("layout_type", v),
  title: (v) => assignmentString("title", v),
  description: (v) => assignmentString("description", v),
  widgets: (v) => mapArrayToBlocks(v, "widget", (k1, v1) => WIDGET[k1](v1)),
  id: (v) => assignmentString("id", v),
  is_read_only: (v) => assignmentString("is_read_only", v),
  notify_list: (v) => assignmentString("notify_list", v),
  template_variables: (v) => mapArrayToBlocks(v, "template_variable", assignmentString),
  template_variable_presets: (v) =>
    mapArrayToBlocks(v, "template_variable_preset", (k1, v1) =>
      TEMPLATE_VARIABLE_PRESET[k1](v1)
    ),
  url: (v) => assignmentString("url", v),
};

const WIDGET = {
  id: (v) => assignmentString("id", v),
  definition: (v) => widgetDefintion(v),
  layout: (v) => convertLeafBlock("widget_layout", v),
};

const TEMPLATE_VARIABLE_PRESET = {
  name: (v) => assignmentString("name", v),
  template_variables: (v) => mapArrayToBlocks(v, "template_variable", assignmentString),
};

const WIDGET_DEFINTION = {
  alert_id: (v) => assignmentString("alert_id", v),
  viz_type: (v) => assignmentString("viz_type", v),
  live_span: (v) => assignmentString("live_span", v),
};

// TODO
function widgetDefintion(contents) {
  return convertLeafBlock(`${contents.type}_definition`, contents);
}

function mapArrayToBlocks(array, elemName, elemConverter) {
  let result = "\n";

  array.forEach((elem) => {
    result += `\n${elemName} {`;
    Object.entries(elem).forEach(([k, v]) => {
      result += elemConverter(k, v);
    });
    result += "\n}";
  });
  return result + "\n";
}

export function convert(resourceName, dashboardData) {
  let result = "";
  Object.entries(dashboardData).forEach(([k, v]) => {
    result += DASHBOARD[k](v);
  });
  return `resource "datadog_dashboard" "${resourceName}" {${result}\n}`;
}
