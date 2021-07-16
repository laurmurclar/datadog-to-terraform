import {
  assignmentString,
  block,
  blockList,
  convertFromDefinition,
  queryBlockList,
} from "./utils.js";

const DASHBOARD = {
  // TODO dashboard_lists (Set of Number)
  dashboard_lists_removed: (_) => "", // Internal only.
  description: (v) => assignmentString("description", v),
  id: (_) => "",
  is_read_only: (v) => assignmentString("is_read_only", v),
  layout_type: (v) => assignmentString("layout_type", v),
  notify_list: (v) => assignmentString("notify_list", v),
  reflow_type: (v) => assignmentString("reflow_type", v),
  restricted_roles: (_) => "// restricted_roles is still in beta",
  template_variable_presets: (v) =>
    blockList(v, "template_variable_preset", (k1, v1) =>
      convertFromDefinition(TEMPLATE_VARIABLE_PRESET, k1, v1)
    ),
  template_variables: (v) => blockList(v, "template_variable", assignmentString),
  title: (v) => assignmentString("title", v),
  url: (v) => assignmentString("url", v),
  widgets: (v) => convertWidgets(v),
};

const EVENT_QUERY = {
  aggregator: (v) => assignmentString("aggregator", v),
  compute: (v) => block("compute", v, assignmentString),
  data_source: (v) => assignmentString("data_source", v),
  group_by: (v) =>
    blockList(v, "group_by", (k1, v1) => convertFromDefinition(EVENT_QUERY_GROUP_BY, k1, v1)),
  indexes: (v) => assignmentString("indexes", v),
  name: (v) => assignmentString("name", v),
  search: (v) => block("search", v, assignmentString),
};

const EVENT_QUERY_GROUP_BY = {
  facet: (v) => assignmentString("facet", v),
  limit: (v) => assignmentString("limit", v),
  sort: (v) => block("sort", v, assignmentString),
};

const FORMULA = {
  alias: (v) => assignmentString("alias", v),
  formula: (v) => assignmentString("formula_expression ", v),
  limit: (v) => block("limit", v, (k1, v1) => convertFromDefinition(FORMULA_LIMIT, k1, v1)),
};

const FORMULA_LIMIT = {
  count: (v) => assignmentString("count", v),
  order: (v) => assignmentString("order", v),
};

const REQUEST = {
  aggregator: (v) => assignmentString("aggregator", v),
  alias: (v) => assignmentString("alias", v),
  apm_query: (v) => assignmentString("apm_query", v),
  apm_stats_query: (v) => assignmentString("apm_stats_query", v),
  cell_display_mode: (v) => assignmentString("cell_display_mode", v),
  change_type: (v) => assignmentString("change_type", v),
  compare_to: (v) => assignmentString("compare_to", v),
  conditional_formats: (v) => blockList(v, "conditional_formats", assignmentString),
  display_type: (v) => assignmentString("display_type", v),
  fill: (v) => block("fill", v, assignmentString),
  formulas: (v) => blockList(v, "formula", (k1, v1) => convertFromDefinition(FORMULA, k1, v1)),
  increase_good: (v) => assignmentString("increase_good", v),
  limit: (v) => assignmentString("limit", v),
  log_query: (v) =>
    block("log_query", v, (k1, v1) => convertFromDefinition(LOG_QUERY, k1, v1)),
  metadata: (v) => blockList(v, "metadata", assignmentString),
  network_query: (v) => assignmentString("network_query", v),
  on_right_yaxis: (v) => assignmentString("on_right_yaxis", v),
  order: (v) => assignmentString("order", v),
  order_by: (v) => assignmentString("order_by", v),
  order_dir: (v) => assignmentString("order_dir", v),
  process_query: (v) => assignmentString("process_query", v),
  q: (v) => assignmentString("q", v),
  queries: (v) => queryBlockList(v, assignmentString),
  response_format: (_) => "", // scalar
  rum_query: (v) => assignmentString("rum_query", v),
  security_query: (v) => assignmentString("security_query", v),
  show_present: (v) => assignmentString("show_present", v),
  style: (v) => blockList([v], "style", assignmentString),
};

const TEMPLATE_VARIABLE_PRESET = {
  name: (v) => assignmentString("name", v),
  template_variables: (v) => blockList(v, "template_variable", assignmentString),
};

const WIDGET = {
  definition: (v) => widgetDefinition(v),
  id: (_) => "",
  layout: (v) => block("widget_layout", v, assignmentString),
};

const WIDGET_DEFINITION = {
  alert_id: (v) => assignmentString("alert_id", v),
  autoscale: (v) => assignmentString("autoscale", v),
  background_color: (v) => assignmentString("background_color", v),
  check: (v) => assignmentString("check", v),
  color: (v) => assignmentString("color", v),
  color_by_groups: (v) => assignmentString("color_by_groups", v),
  color_preference: (v) => assignmentString("color_preference", v),
  columns: (v) => assignmentString("columns", v),
  content: (v) => assignmentString("content", v),
  count: (_) => "", // 2.23.0 deprecated, see docs for widget.manage_status_definition
  custom_links: (v) => blockList(v, "custom_link", assignmentString),
  custom_unit: (v) => assignmentString("custom_unit", v),
  display_format: (v) => assignmentString("display_format", v),
  env: (v) => assignmentString("env", v),
  event: (v) => block("event", v, assignmentString),
  events: (v) => blockList(v, "event", assignmentString),
  event_size: (v) => assignmentString("event_size", v),
  filters: (v) => assignmentString("filters", v),
  font_size: (v) => assignmentString("font_size", v),
  global_time_target: (v) => assignmentString("global_time_target", v),
  group: (v) => assignmentString("group", v),
  group_by: (v) => assignmentString("group_by", v),
  grouping: (v) => assignmentString("grouping", v),
  has_padding: (_) => "", // 2.23.0 not described in docs, occurs in widget.note_definition json
  has_search_bar: (v) => assignmentString("has_search_bar", v),
  hide_zero_counts: (v) => assignmentString("hide_zero_counts", v),
  indexes: (v) => assignmentString("indexes", v),
  layout_type: (v) => assignmentString("layout_type", v),
  legend_columns: (v) => assignmentString("legend_columns", v),
  legend_layout: (v) => assignmentString("legend_layout", v),
  legend_size: (v) => assignmentString("legend_size", v),
  live_span: (v) => assignmentString("live_span", v),
  logset: (_) => "", // 2.23.0 deprecated, see docs for widget.log_stream_definition
  margin: (v) => assignmentString("margin", v),
  markers: (v) => blockList(v, "marker", assignmentString),
  message_display: (v) => assignmentString("message_display", v),
  no_group_hosts: (v) => assignmentString("no_group_hosts", v),
  no_metric_hosts: (v) => assignmentString("no_metric_hosts", v),
  node_type: (v) => assignmentString("node_type", v),
  precision: (v) => assignmentString("precision", v),
  query: (v) => assignmentString("query", v),
  requests: (v) => convertRequests(v),
  right_yaxis: (v) => block("right_yaxis", v, assignmentString),
  scope: (v) => assignmentString("scope", v),
  service: (v) => assignmentString("service", v),
  show_breakdown: (v) => assignmentString("show_breakdown", v),
  show_date_column: (v) => assignmentString("show_date_column", v),
  show_distribution: (v) => assignmentString("show_distribution", v),
  show_error_budget: (v) => assignmentString("show_error_budget", v),
  show_errors: (v) => assignmentString("show_errors", v),
  show_hits: (v) => assignmentString("show_hits", v),
  show_last_triggered: (v) => assignmentString("show_last_triggered", v),
  show_latency: (v) => assignmentString("show_latency", v),
  show_legend: (v) => assignmentString("show_legend", v),
  show_message_column: (v) => assignmentString("show_message_column", v),
  show_resource_list: (v) => assignmentString("show_resource_list", v),
  show_tick: (v) => assignmentString("show_tick", v),
  show_title: (v) => assignmentString("show_title", v),
  size_format: (v) => assignmentString("size_format", v),
  sizing: (v) => assignmentString("sizing", v),
  slo_id: (v) => assignmentString("slo_id", v),
  sort: (v) => convertSort(v),
  span_name: (v) => assignmentString("span_name", v),
  start: (_) => "", // 2.23.0 deprecated, see docs for widget.manage_status_definition
  style: (v) => block("style", v, assignmentString),
  summary_type: (v) => assignmentString("summary_type", v),
  tags: (v) => assignmentString("tags", v),
  tags_execution: (v) => assignmentString("tags_execution", v),
  text: (v) => assignmentString("text", v),
  text_align: (v) => assignmentString("text_align", v),
  tick_edge: (v) => assignmentString("tick_edge", v),
  tick_pos: (v) => assignmentString("tick_pos", v),
  time: (v) => (!!v.live_span ? assignmentString("live_span", v.live_span) : ""),
  time_windows: (v) => assignmentString("time_windows", v),
  title: (v) => assignmentString("title", v),
  title_align: (v) => assignmentString("title_align", v),
  title_size: (v) => assignmentString("title_size", v),
  type: (_) => "",
  unit: (v) => assignmentString("unit", v),
  url: (v) => assignmentString("url", v),
  vertical_align: (_) => "", // 2.23.0 not described in docs, occurs in widget.note_definition json
  view_mode: (v) => assignmentString("view_mode", v),
  view_type: (v) => assignmentString("view_type", v),
  viz_type: (v) => assignmentString("viz_type", v),
  widget_layout: (v) => block("widget_layout", v, assignmentString),
  widgets: (v) => convertWidgets(v),
  xaxis: (v) => block("xaxis", v, assignmentString),
  yaxis: (v) => block("yaxis", v, assignmentString),
};

const LOG_QUERY = {
  compute: (v) => block("compute_query", v, assignmentString),
  group_by: (v) =>
    blockList(v, "group_by", (k1, v1) => convertFromDefinition(GROUP_BY, k1, v1)),
  index: (v) => assignmentString("index", v),
  multi_compute: (v) => blockList(v, "multi_compute", assignmentString),
  search: (v) => assignmentString("search_query", v.query),
  search_query: (v) => assignmentString("search_query", v),
};

const GROUP_BY = {
  facet: (v) => assignmentString("facet", v),
  limit: (v) => assignmentString("limit", v),
  sort: (v) => block("sort_query", v, assignmentString),
  sort_query: (v) => block("sort_query", v, assignmentString),
};

function convertEventQuery(value) {
  return block("query", value, (_) =>
    blockList(value, "event_query", (k1, v1) => convertFromDefinition(EVENT_QUERY, k1, v1))
  );
}

function convertRequests(value) {
  if (Array.isArray(value)) {
    return blockList(value, "request", (k, v) => convertFromDefinition(REQUEST, k, v));
  }
  return block("request", value, (k, v) => convertFromDefinition(REQUEST, k, v));
}

function convertSort(v) {
  return typeof v === "string"
    ? assignmentString("sort", v)
    : block("sort", v, assignmentString);
}

function convertWidgets(value) {
  return blockList(value, "widget", (k1, v1) => convertFromDefinition(WIDGET, k1, v1));
}

function widgetDefinition(contents) {
  let definitionType = contents.type === "slo" ? "service_level_objective" : contents.type;
  return block(`\n${definitionType}_definition`, contents, (k, v) =>
    convertFromDefinition(WIDGET_DEFINITION, k, v)
  );
}

export function generateDashboardTerraformCode(resourceName, dashboardData) {
  let result = "";
  Object.entries(dashboardData).forEach(([k, v]) => {
    result += convertFromDefinition(DASHBOARD, k, v);
  });
  return `resource "datadog_dashboard" "${resourceName}" {${result}\n}`;
}
