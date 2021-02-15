function literalString(value) {
  if (typeof value === "string") {
    if (value.includes("\n")) {
      return `<<EOF\n${value}\nEOF`;
    }
    return `"${value}"`;
  } else if (Array.isArray(value)) {
    let result = "[";
    value.forEach((elem, index) => {
      result += literalString(elem);
      if (index !== value.length - 1) result += ",";
    });
    return result + "]";
  }
  return value;
}

export function assignmentString(key, value) {
  if (value === null) return "";
  const displayValue = literalString(value);
  return `\n${key} = ${displayValue}`;
}

export function block(name, contents, converter) {
  let result = "";
  Object.entries(contents).forEach(([key, value]) => {
    result += converter(key, value);
  });
  return `\n${name} {${result}\n}`;
}

export function blockList(array, blockName, contentConverter) {
  let result = "";
  array.forEach((elem) => {
    result += block(blockName, elem, contentConverter);
  });
  return result;
}
