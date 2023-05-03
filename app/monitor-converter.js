import { assignmentString, block, convertFromDefinition, map } from "./utils.js";

const MONITOR = {
  message: (v) => assignmentString("message", v),
  name: (v) => assignmentString("name", v),
  query: (v) => assignmentString("query", v),
  type: (v) => assignmentString("type", v),
  options: (v) => map(v, (k1, v1) => convertFromDefinition(OPTIONS, k1, v1)),
  id: (_) => "",
  tags: (v) => assignmentString("tags", v),
  priority: (v) => assignmentString("priority", v),
  restricted_roles: (v) => assignmentString("restricted_roles", v),
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
  new_group_delay: (v) => assignmentString("new_group_delay", v),
  renotify_statuses: (v) => assignmentString("renotify_statuses", v),
};

export function generateTerraformCode(resourceName, monitorData) {
  let result = "";
  Object.entries(monitorData).forEach(([k, v]) => {
    result += convertFromDefinition(MONITOR, k, v);
  });
  return `resource "datadog_monitor" "${resourceName}" {${result}\n}`;
}
