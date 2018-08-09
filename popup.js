import { generateTerraformCode } from './generator.js';

function onClick() {
  // get the input
  var datadogJson = document.getElementById('datadogJson').value;
  // convert it
  var terraformAlarmCode = generateTerraformCode("some_name", JSON.parse(datadogJson));

  // add to the result input
  document.getElementById('result').innerHTML = terraformAlarmCode;

  // copy to clipboard
  copyResult();
}

function copyResult() {
  /* Get the text field */
  var copyText = document.getElementById('result');

  /* Select the text field */
  copyText.select();

  /* Copy the text inside the text field */
  document.execCommand('copy');
}

document.getElementById('convertButton').addEventListener('click', onClick);
