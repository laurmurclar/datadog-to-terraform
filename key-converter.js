export default convert(key, value) {
  let result = "\n";
  switch(key) {
    case 'name':
    case 'type':
    case 'query':
    case 'message':
      result += `"${key}": "${monitorJson[key]}"`;
      break;
    default:
      result += `Conversion for "${key}" not found`;
      break;
  }
  return result;
}
