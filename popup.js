import { generateTerraformCode } from './generator.js';

function onClick() {
  var resourceName = document.getElementById('resourceName').value;
  var datadogJson = document.getElementById('datadogJson').value;

  try {
    var terraformAlarmCode = generateTerraformCode(resourceName, JSON.parse(datadogJson));
    addDomElementsForResult(terraformAlarmCode);
    copyResultToClipboard();
    updateStatusMessage('Copied to clipboard!', false);
  } catch (e) {
    updateStatusMessage(e, true);
  }
}

function addDomElementsForResult(terraformAlarmCode) {
  var resultTextArea = document.createElement('textarea');
  resultTextArea.id = 'result';
  resultTextArea.innerHTML = terraformAlarmCode;

  var outputWrapperDiv = document.getElementById('outputWrapper');
  outputWrapperDiv.appendChild(resultTextArea);
  outputWrapperDiv.classList.add('active');
}

function copyResultToClipboard() {
  var copyText = document.getElementById('result');
  copyText.select();
  document.execCommand('copy');
}

function updateStatusMessage(message, isError) {
  var newMessageText = isError ? '❗️' + message : '🎉' + message;
  var statusMessageElement = document.getElementById('statusMessage');
  statusMessageElement.innerHTML = newMessageText;
  document.getElementById('convertButton').style.marginBottom = '0';
  if (isError) {
    statusMessageElement.style.color = 'red';
  }
}

document.getElementById('convertButton').addEventListener('click', onClick);
