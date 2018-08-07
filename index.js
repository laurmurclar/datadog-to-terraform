const monitorJson = {
	"name": "Status",
	"type": "metric alert",
	"query": "sum(last_5m):sum:production.controllers.Api.status{controller:public.appstore.apppackagescontroller} by {status}.as_count() > 50",
	"message": "{{#is_alert}}\nAlert alert! Fix the thing. \n\nLogs etc go here\n{{/is_alert}} \n\n\n{{#is_alert_recovery}}\nYaaaay\n{{/is_alert_recovery}}",
	"tags": [],
	"options": {
		"notify_audit": false,
		"locked": false,
		"timeout_h": 0,
		"new_host_delay": 300,
		"require_full_window": true,
		"notify_no_data": false,
		"renotify_interval": "0",
		"escalation_message": "",
		"no_data_timeframe": null,
		"include_tags": false,
		"thresholds": {
			"critical": 50
		}
	}
};
const monitorId = "some_given_arg";

function convert(key) {
  const value = monitorJson[key];
  return `\n"${key}": "${monitorJson[key]}"`;
};

function monitorBody() {
  let result = "";
  const keys = Object.keys(monitorJson);

  keys.forEach((key) => {
    result += convert(key);
  });

  return result;
};

const terraformMonitor = `resource "datadog_monitor" "${monitorId}" {
  ${monitorBody()}
}`;

console.log(terraformMonitor);
