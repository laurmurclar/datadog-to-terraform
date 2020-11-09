resource "datadog_monitor" "hi" {
  name                = "CPU load is high"
  type                = "metric alert"
  query               = "avg(last_5m):avg:system.cpu.system{*} > 50"
  message             = <<EOF
{{#is_alert}}
 Possible explanations are x, y or z. Check blah, blah blah.
{{/is_alert}}

{{#is_recovery}}
CPU is at an acceptable level again
{{/is_recovery}}  @all
EOF
  tags                = ["team-cpu"]
  notify_audit        = false
  locked              = true
  timeout_h           = 0
  new_host_delay      = 300
  require_full_window = false
  notify_no_data      = false
  renotify_interval   = "0"
  escalation_message  = ""
  include_tags        = true
  thresholds = {
    critical = 50
  }
}
