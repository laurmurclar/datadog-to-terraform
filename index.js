// const monitorJson = {
// 	"name": "Status",
// 	"type": "metric alert",
// 	"query": "sum(last_5m):sum:production.controllers.Api.status{controller:public.appstore.apppackagescontroller} by {status}.as_count() > 50",
// 	"message": "{{#is_alert}}\nAlert alert! Fix the thing. \n\nLogs etc go here\n{{/is_alert}} \n\n\n{{#is_alert_recovery}}\nYaaaay\n{{/is_alert_recovery}}",
// 	"tags": ["team-app-framework", "terraform:true"],
// 	"options": {
// 		"notify_audit": false,
// 		"locked": false,
// 		"timeout_h": 0,
// 		"new_host_delay": 300,
// 		"require_full_window": true,
// 		"notify_no_data": false,
// 		"renotify_interval": "0",
// 		"escalation_message": "",
// 		"no_data_timeframe": null,
// 		"include_tags": false,
// 		"thresholds": {
// 			"critical": 50
// 		}
// 	}
// };

const monitorJson = {
	"name": "example",
	"type": "metric alert",
	"query": "sum(last_5m):avg:production.controllers.Api.status{status:500}.as_count() > 50",
	"message": "boop bopp @pagerduty-team-app-framework",
	"tags": [
		"service:buildkite-test-pipeline",
		"team-operator"
	],
	"options": {
		"notify_audit": true,
		"locked": true,
		"timeout_h": 0,
		"new_host_delay": 300,
		"require_full_window": true,
		"notify_no_data": false,
		"renotify_interval": 10,
		"evaluation_delay": 5,
		"escalation_message": "dffdf",
		"no_data_timeframe": null,
		"include_tags": false,
		"thresholds": {
			"critical": 50,
			"warning": 70
		}
	}
};

const monitorId = "some_given_arg";

const REQUIRED_KEYS = [
	'name',
	'type',
	'query',
	'message',
];

const ALLOWED_THRESHOLD_KEYS = [
	'ok',
	'critical',
	'critical_recovery',
	'warning',
	'warning_recovery',
	'unknown',
];

const ALLOWED_OPTIONS_KEYS = [
	'notify_no_data',
	'new_host_delay',
	'evaluation_delay',
	'no_data_timeframe',
	'renotify_interval',
	'notify_audit',
	'timeout_h',
	'include_tags',
	'require_full_window',
	'locked',
	'escalation_message',
	'thresholds',
];

function convertThresholds(thresholds) {
	let result = "\n";
	Object.entries(thresholds).forEach(([key, value]) => {
		if (ALLOWED_THRESHOLD_KEYS.includes(key)) {
			result += assignmentString(key, value);
		} else {
			throw `Conversion for "${key}" not found`;
		}
	});
  return `thresholds {${result}}`;
}

function literalString(value) {
	if (typeof value == 'string') {
		if (value.includes('\n')) {
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

function assignmentString(key, value) {
	if (value === null) return "";
	const displayValue = literalString(value);
  return `${key} = ${displayValue}\n`;
}

function convertOptions(options) {
	let result = "";
	Object.entries(options).forEach(([key, value]) => {
		if (ALLOWED_OPTIONS_KEYS.includes(key)) {
			if (key === 'thresholds') {
				result += convertThresholds(value);
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
	if (REQUIRED_KEYS.includes(key) || key === 'tags') {
		result += assignmentString(key, value);
	} else if (key === 'options') {
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
};

function generateTerraformCode(resourceName, monitorJson) {
	if (!monitorJson || !REQUIRED_KEYS.every((key) => key in monitorJson)) {
		throw "You're missing a required key.";
	}
	return `resource "datadog_monitor" "${resourceName}" {${monitorBody(monitorJson)}}`;
}

console.log(generateTerraformCode(monitorId, monitorJson));
