import { generateTerraformCode } from './generator.js';

function onClick() {
  var resourceName = document.getElementById('resourceName').value;
  var datadogJson = document.getElementById('datadogJson').value;

  var terraformAlarmCode = generateTerraformCode(resourceName, JSON.parse(datadogJson));
  document.getElementById('result').innerHTML = terraformAlarmCode;

  copyResult();
}

function copyResult() {
  var copyText = document.getElementById('result');
  copyText.select();
  document.execCommand('copy');
}

document.getElementById('convertButton').addEventListener('click', onClick);
