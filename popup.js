import { generateTerraformCode } from "./monitor_generator.js";
import { generateDashboardTerraformCode } from "./dashboard_generator.js";

function onClick() {
  var resourceName = document.getElementById("resourceName").value;
  var datadogJson = document.getElementById("datadogJson").value;

  try {
    var terraformAlarmCode;
    if (document.getElementById("monitorChoice").checked) {
      //rate_value = document.getElementById('r1').value;
      terraformAlarmCode = generateTerraformCode(resourceName, JSON.parse(datadogJson));
    } else {
      terraformAlarmCode = generateDashboardTerraformCode(
        resourceName,
        JSON.parse(datadogJson)
      );
    }

    addDomElementsForResult(terraformAlarmCode);
    copyResultToClipboard();
    updateStatusMessage("Copied to clipboard!", false);
  } catch (e) {
    updateStatusMessage(e, true);
  }
}

function addDomElementsForResult(terraformAlarmCode) {
  var resultTextArea = document.createElement("textarea");
  resultTextArea.id = "result";
  resultTextArea.textContent = terraformAlarmCode;

  var outputWrapperDiv = document.getElementById("outputWrapper");
  outputWrapperDiv.appendChild(resultTextArea);
  outputWrapperDiv.classList.add("active");
}

function copyResultToClipboard() {
  var copyText = document.getElementById("result");
  copyText.select();
  document.execCommand("copy");
}

function updateStatusMessage(message, isError) {
  var newMessageText = isError ? "❗️" + message : "🎉" + message;
  var statusMessageElement = document.getElementById("statusMessage");
  statusMessageElement.textContent = newMessageText;
  document.getElementById("convertButton").style.marginBottom = "0";
  if (isError) {
    statusMessageElement.style.color = "red";
  }
}

document.getElementById("convertButton").addEventListener("click", onClick);
