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

const ALLOWED_THRESHOLD_KEYS = [
	'ok',
	'critical',
	'critical_recovery',
	'warning',
	'warning_recovery',
	'unknown',
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
  const optionsKeys = Object.keys(options);
  optionsKeys.forEach((key) => {
    switch(key) {
      case 'thresholds':
        result += convertThresholds(options[key]);
        break;
			case 'notify_no_data':
			case 'new_host_delay':
			case 'evaluation_delay':
			case 'no_data_timeframe':
			case 'renotify_interval':
			case 'notify_audit':
			case 'timeout_h':
			case 'include_tags':
			case 'require_full_window':
			case 'locked':
			case 'escalation_message':
        result += assignmentString(key, options[key]);
        break;
      default:
				throw `Conversion for "${key}" not found`;
				break;
    }
  });
  return result;
}

function convert(key, value) {
  let result = "";
  switch(key) {
    case 'name':
    case 'type':
    case 'query':
		case 'message':
		case 'tags':
      result += assignmentString(key, monitorJson[key]);
      break;
    case 'options':
      result += convertOptions(value);
      break;
    default:
      throw `Conversion for "${key}" not found`;
      break;
  }
  return result;
};

function monitorBody(monitorJson) {
  let result = "\n";
  const keys = Object.keys(monitorJson);

  keys.forEach((key) => {
    result += convert(key, monitorJson[key]);
  });

  return result;
};

function generateTerraformCode(monitorJson) {
	if (!monitorJson || !monitorJson.type || !monitorJson.name || !monitorJson.query || !monitorJson.message) {
		throw 'You need to provide a type, name, query and message.';
	}
	return `resource "datadog_monitor" "${monitorId}" {${monitorBody(monitorJson)}}`;
}

console.log(generateTerraformCode(monitorJson));
