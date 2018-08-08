const monitorJson = {
	"name": "Status",
	"type": "metric alert",
	"query": "sum(last_5m):sum:production.controllers.Api.status{controller:public.appstore.apppackagescontroller} by {status}.as_count() > 50",
	"message": "{{#is_alert}}\nAlert alert! Fix the thing. \n\nLogs etc go here\n{{/is_alert}} \n\n\n{{#is_alert_recovery}}\nYaaaay\n{{/is_alert_recovery}}",
	"tags": ["team-app-framework", "terraform:true"],
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

function convertThresholds(thresholds) {
	let thresholdStrings = "\n";
	Object.entries(thresholds).forEach(([key, value]) => {
		thresholdStrings += assignmentString(key, value) + "\n"
	});
  return `thresholds {${thresholdStrings}}`;
}

function literalString(value) {
	if (typeof value == 'string') {
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
	const displayValue = literalString(value);
	// TODO logic for multiline strings
  return `${key} = ${displayValue}`;
}

function convertOptions(options) {
  // pull thresholds out to top-level
  let result = "";
  const optionsKeys = Object.keys(options);
  optionsKeys.forEach((key) => {
    switch(key) {
      case 'thresholds':
        result += convertThresholds(options[key]);
        break;
      default:
        result += assignmentString(key, options[key]); // TODO capture in function, surround strings in quotes
        break;
    }
		result += "\n";
  });
  return result;
}

// TODO can make this a recursive tree thing, would probs be better
function convert(key, value) {
  let result = "";
  switch(key) {
    case 'name':
    case 'type':
    case 'query':
    case 'message': // TODO need to do the multi line message thing, or make sure new lines get escaped properly so they stay in
		case 'tags':
      result += assignmentString(key, monitorJson[key]); // TODO capture in function, surround strings in quotes
      break;
    case 'options':
      result += convertOptions(value);
      break;
    default:
      result += `Conversion for "${key}" not found`;
      break;
  }
  return result + "\n";
};

function monitorBody() {
  let result = "\n";
  const keys = Object.keys(monitorJson);

  keys.forEach((key) => {
    result += convert(key, monitorJson[key]);
  });

  return result;
};

const terraformMonitor = `resource "datadog_monitor" "${monitorId}" {${monitorBody()}}`;

console.log(terraformMonitor);
