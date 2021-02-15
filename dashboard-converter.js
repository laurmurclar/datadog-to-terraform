import { assignmentString, block, blockList, convertFromDefinition } from "./utils.js";

const DASHBOARD = {
  layout_type: (v) => assignmentString("layout_type", v),
  title: (v) => assignmentString("title", v),
  description: (v) => assignmentString("description", v),
  widgets: (v) => convertWidgets(v),
  id: (_) => "",
  is_read_only: (v) => assignmentString("is_read_only", v),
  notify_list: (v) => assignmentString("notify_list", v),
  template_variables: (v) => blockList(v, "template_variable", assignmentString),
  template_variable_presets: (v) =>
    blockList(v, "template_variable_preset", (k1, v1) =>
      convertFromDefinition(TEMPLATE_VARIABLE_PRESET, k1, v1)
    ),
  url: (v) => assignmentString("url", v),
};

const WIDGET = {
  id: (_) => "",
  definition: (v) => widgetDefintion(v),
  layout: (v) => block("widget_layout", v, assignmentString),
};

const TEMPLATE_VARIABLE_PRESET = {
  name: (v) => assignmentString("name", v),
  template_variables: (v) => blockList(v, "template_variable", assignmentString),
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
  custom_links: (v) => blockList(v, "custom_link", assignmentString),
  requests: (v) => blockList(v, "request", (k1, v1) => convertFromDefinition(REQUEST, k1, v1)),
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
  xaxis: (v) => block("xaxis", v, assignmentString),
  yaxis: (v) => block("yaxis", v, assignmentString),
  no_group_hosts: (v) => assignmentString("no_group_hosts", v),
  no_metric_hosts: (v) => assignmentString("no_metric_hosts", v),
  node_type: (v) => assignmentString("node_type", v),
  scope: (v) => assignmentString("scope", v),
  style: (v) => block("style", v, assignmentString),
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
  event: (v) => block("event", v, assignmentString),
  legend_size: (v) => assignmentString("legend_size", v),
  markers: (v) => blockList(v, "marker", assignmentString),
  right_yaxis: (v) => block("right_yaxis", v, assignmentString),
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
  widget_layout: (v) => block("widget_layout", v, assignmentString),
  legend_layout: (_) => "",
  legend_columns: (_) => "",
  global_time_target: (_) => "",
};

const REQUEST = {
  apm_query: (v) => assignmentString("apm_query", v),
  apm_stats_query: (v) => assignmentString("apm_stats_query", v),
  change_type: (v) => assignmentString("change_type", v),
  compare_to: (v) => assignmentString("compare_to", v),
  increase_good: (v) => assignmentString("increase_good", v),
  log_query: (v) => assignmentString("log_query", v),
  order_by: (v) => assignmentString("order_by", v),
  order_dir: (v) => assignmentString("order_dir", v),
  process_query: (v) => assignmentString("process_query", v),
  q: (v) => assignmentString("q", v),
  rum_query: (v) => assignmentString("rum_query", v),
  security_query: (v) => assignmentString("security_query", v),
  show_present: (v) => assignmentString("show_present", v),
  style: (v) => block("style", v, assignmentString),
  display_type: (v) => assignmentString("display_type", v),
  metadata: (v) => blockList(v, "metadata", assignmentString),
  network_query: (v) => assignmentString("network_query", v),
  on_right_axis: (v) => assignmentString("on_right_axis", v),
  aggregator: (v) => assignmentString("aggregator", v),
  alias: (v) => assignmentString("alias", v),
  cell_display_mode: (v) => assignmentString("cell_display_mode", v),
  conditional_formats: (v) => blockList(v, "conditional_formats", assignmentString),
  limit: (v) => assignmentString("limit", v),
  order: (v) => assignmentString("order", v),
};

function convertSort(v) {
  return typeof v === "string"
    ? assignmentString("sort", v)
    : block("sort", v, assignmentString);
}

function convertWidgets(value) {
  return blockList(value, "widget", (k1, v1) => convertFromDefinition(WIDGET, k1, v1));
}

function widgetDefintion(contents) {
  let result = "";
  Object.entries(contents).forEach(([k, v]) => {
    result += convertFromDefinition(WIDGET_DEFINTION, k, v);
  });
  let definitionType = contents.type === "slo" ? "service_level_objective" : contents.type;
  return `\n${definitionType}_definition {${result}\n}`;
}

export function generateDashboardTerraformCode(resourceName, dashboardData) {
  let result = "";
  Object.entries(dashboardData).forEach(([k, v]) => {
    result += convertFromDefinition(DASHBOARD, k, v);
  });
  return `resource "datadog_dashboard" "${resourceName}" {${result}\n}`;
}
