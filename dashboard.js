import { assignmentString, convertLeafBlock } from "./utils";

const DASHBOARD = {
  layout_type: (v) => assignmentString("layout_type", v),
  title: (v) => assignmentString("title", v),
  description: (v) => assignmentString("description", v),
  widgets: (v) => convertWidgets(v),
  id: (_) => "",
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
  id: (_) => "",
  definition: (v) => widgetDefintion(v),
  layout: (v) => convertLeafBlock("widget_layout", v),
};

const TEMPLATE_VARIABLE_PRESET = {
  name: (v) => assignmentString("name", v),
  template_variables: (v) => mapArrayToBlocks(v, "template_variable", assignmentString),
};

const WIDGET_DEFINTION = {
  type: (_) => "",
  title: (v) => assignmentString("title", v),
  title_size: (v) => assignmentString("title_size", v),
  title_align: (v) => assignmentString("title_align", v),
  alert_id: (v) => assignmentString("alert_id", v),
  precision: (v) => assignmentString("precision", v),
  text_align: (v) => assignmentString("text_align", v),
  unit: (v) => assignmentString("unit", v),
  custom_links: (v) => mapArrayToBlocks(v, "custom_link", assignmentString),
  requests: (_) => "", // TODO
  check: (v) => assignmentString("check", v),
  grouping: (v) => assignmentString("grouping", v),
  group: (v) => assignmentString("group", v),
  group_by: (v) => assignmentString("group_by", v),
  tags: (v) => assignmentString("tags", v),
  legend_size: (v) => assignmentString("legend_size", v),
  show_legend: (v) => assignmentString("show_legend", v),
  query: (v) => assignmentString("query", v),
  event_size: (v) => assignmentString("event_size", v),
  tags_execution: (v) => assignmentString("tags_execution", v),
  text: (v) => assignmentString("text", v),
  color: (v) => assignmentString("color", v),
  font_size: (v) => assignmentString("font_size", v),
  layout_type: (v) => assignmentString("layout_type", v),
  widgets: (v) => convertWidgets(v),
  viz_type: (v) => assignmentString("viz_type", v),
  live_span: (v) => assignmentString("live_span", v),
  time: (v) => (!!v.live_span ? assignmentString("live_span", v.live_span) : ""),
  xaxis: (v) => convertLeafBlock("xaxis", v),
  yaxis: (v) => convertLeafBlock("yaxis", v),
  no_group_hosts: (v) => assignmentString("no_group_hosts", v),
  no_metric_hosts: (v) => assignmentString("no_metric_hosts", v),
  node_type: (v) => assignmentString("node_type", v),
  scope: (v) => assignmentString("scope", v),
  style: (v) => convertLeafBlock("style", v),
  url: (v) => assignmentString("url", v),
  margin: (v) => assignmentString("margin", v),
  sizing: (v) => assignmentString("sizing", v),
  columns: (v) => assignmentString("columns", v),
  indexes: (v) => assignmentString("indexes", v),
  message_display: (v) => assignmentString("message_display", v),
  show_date_column: (v) => assignmentString("show_date_column", v),
  show_message_column: (v) => assignmentString("show_message_column", v),
  show_message_column: (v) => assignmentString("show_message_column", v),
  sort: (v) => convertSort(v),
  color_preference: (v) => assignmentString("color_preference", v),
  display_format: (v) => assignmentString("display_format", v),
  hide_zero_counts: (v) => assignmentString("hide_zero_counts", v),
  show_last_triggered: (v) => assignmentString("show_last_triggered", v),
  summary_type: (v) => assignmentString("summary_type", v),
  content: (v) => assignmentString("content", v),
  background_color: (v) => assignmentString("background_color", v),
  show_tick: (v) => assignmentString("show_tick", v),
  tick_edge: (v) => assignmentString("tick_edge", v),
  tick_pos: (v) => assignmentString("tick_pos", v),
  has_search_bar: (v) => assignmentString("has_search_bar", v),
  autoscale: (v) => assignmentString("autoscale", v),
  custom_unit: (v) => assignmentString("custom_unit", v),
  color_by_groups: (v) => assignmentString("color_by_groups", v),
  slo_id: (v) => assignmentString("slo_id", v),
  time_windows: (v) => assignmentString("time_windows", v),
  view_mode: (v) => assignmentString("view_mode", v),
  view_type: (v) => assignmentString("view_type", v),
  show_error_budget: (v) => assignmentString("show_error_budget", v),
  filters: (v) => assignmentString("filters", v),
  service: (v) => assignmentString("service", v),
  event: (v) => convertLeafBlock("event", v),
  legend_size: (v) => assignmentString("legend_size", v),
  markers: (v) => mapArrayToBlocks(v, "marker", assignmentString),
  right_yaxis: (v) => convertLeafBlock("right_yaxis", v),
  env: (v) => assignmentString("env", v),
  span_name: (v) => assignmentString("span_name", v),
  display_format: (v) => assignmentString("display_format", v),
  show_breakdown: (v) => assignmentString("show_breakdown", v),
  show_distribution: (v) => assignmentString("show_distribution", v),
  show_errors: (v) => assignmentString("show_errors", v),
  show_hits: (v) => assignmentString("show_hits", v),
  show_latency: (v) => assignmentString("show_latency", v),
  show_resource_list: (v) => assignmentString("show_resource_list", v),
  size_format: (v) => assignmentString("size_format", v),
  widget_layout: (v) => convertLeafBlock("widget_layout", v),
  legend_layout: (_) => "",
  legend_columns: (_) => "",
};

function convertSort(v) {
  return typeof v === "string" ? assignmentString("sort", v) : convertLeafBlock("sort", v);
}

function convertWidgets(value) {
  return mapArrayToBlocks(value, "widget", (k, v) => WIDGET[k](v));
}

function widgetDefintion(contents) {
  let result = "\n";
  Object.entries(contents).forEach(([k, v]) => {
    result += WIDGET_DEFINTION[k](v);
  });
  return `\n${contents.type}_definition {${result}\n}\n`;
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
