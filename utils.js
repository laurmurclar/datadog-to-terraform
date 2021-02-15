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

export function convertLeafBlock(name, contents) {
  let result = "";
  Object.entries(contents).forEach(([key, value]) => {
    result += assignmentString(key, value);
  });
  return `\n${name} {${result}\n}`;
}
