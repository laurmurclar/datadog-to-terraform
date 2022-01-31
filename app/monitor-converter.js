import { assignmentString, block, convertFromDefinition } from "./utils.js";

const MONITOR = {
  message: (v) => assignmentString("message", v),
  name: (v) => assignmentString("name", v),
  query: (v) => assignmentString("query", v),
  type: (v) => assignmentString("type", v),
  options: (v) => block("options", v, (k1, v1) => convertFromDefinition(OPTIONS, k1, v1)),
  id: (_) => "",
  tags: (v) => assignmentString("tags", v),
  priority: (v) => assignmentString("priority", v),
  classification: (v) => assignmentString("classification", v),
};

const OPTIONS = {
  enable_logs_sample: (v) => assignmentString("enable_logs_sample", v),
  escalation_message: (v) => assignmentString("escalation_message", v),
  evaluation_delay: (v) => assignmentString("evaluation_delay", v),
  force_delete: (v) => assignmentString("force_delete", v),
  include_tags: (v) => assignmentString("include_tags", v),
  locked: (v) => assignmentString("locked", v),
  new_host_delay: (v) => assignmentString("new_host_delay", v),
  no_data_timeframe: (v) => assignmentString("no_data_timeframe", v),
  notify_audit: (v) => assignmentString("notify_audit", v),
  notify_no_data: (v) => assignmentString("notify_no_data", v),
  renotify_interval: (v) => assignmentString("renotify_interval", v),
  require_full_window: (v) => assignmentString("require_full_window", v),
  restricted_roles: (v) => assignmentString("restricted_roles", v),
  threshold_windows: (v) => block("monitor_threshold_windows", v, assignmentString),
  thresholds: (v) => block("monitor_thresholds", v, assignmentString),
  timeout_h: (v) => assignmentString("timeout_h", v),
  validate: (v) => assignmentString("timeout_h", v),
  groupby_simple_monitor: (v) => assignmentString("groupby_simple_monitor", v),
  silenced: (_) => "", // 2.23.0 deprecated
  queryConfig: (v) =>
    block("queryConfig", v, (k1, v1) => convertFromDefinition(QUERY_CONFIG, k1, v1)),
  aggregation: (v) =>
    block("aggregation", v, (k1, v1) => convertFromDefinition(AGGREGATION, k1, v1)),
  restriction_query: (v) => assignmentString("restriction_query", v),
};

const QUERY_CONFIG = {
  logset: (v) => block("logset", v, (k1, v1) => convertFromDefinition(LOGSET, k1, v1)),
  track: (v) => assignmentString("track", v),
  timeRange: (v) =>
    block("timeRange", v, (k1, v1) => convertFromDefinition(TIME_RANGE, k1, v1)),
  queryString: (v) => assignmentString("queryString", v),
  indexes: (v) => assignmentString("indexes", v),
  queryIsFailed: (v) => assignmentString("queryIsFailed", v),
  live: (v) => assignmentString("live", v),
};

const AGGREGATION = {
  metric: (v) => assignmentString("metric", v),
  type: (v) => assignmentString("type", v),
  groupBy: (v) => assignmentString("groupBy", v),
};

const LOGSET = {
  name: (v) => assignmentString("name", v),
  type: (v) => assignmentString("type", v),
  dailyLimit: (v) => assignmentString("dailyLimit", v),
  rateLimited: (v) => assignmentString("rateLimited", v),
  scopeId: (v) => assignmentString("scopeId", v),
  retention: (v) => assignmentString("retention", v),
  readDataAccess: (v) => assignmentString("readDataAccess", v),
  id: (v) => assignmentString("id", v),
  dailyQuotaDisabled: (v) => assignmentString("dailyQuota", v),
  query: (v) => assignmentString("query", v),
};

const TIME_RANGE = {
  to: (v) => assignmentString("to", v),
  live: (v) => assignmentString("live", v),
  from: (v) => assignmentString("from", v),
};

export function generateTerraformCode(resourceName, monitorData) {
  let result = "";
  Object.entries(monitorData).forEach(([k, v]) => {
    result += convertFromDefinition(MONITOR, k, v);
  });
  return `resource "datadog_monitor" "${resourceName}" {${result}\n}`;
}
