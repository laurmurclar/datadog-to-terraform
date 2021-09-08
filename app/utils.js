function literalString(value) {
  if (typeof value === "string") {
    if (value.includes("\n")) {
      return `<<EOF\n${value}\nEOF`;
    }
    return `"${value}"`;
  }
  if (Array.isArray(value)) {
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

export function map(contents, converter) {
  let result = "";
  const ordered = Object.keys(contents)
    .sort()
    .reduce((v, k) => {
      v[k] = contents[k];
      return v;
    }, {});
  Object.entries(ordered).forEach(([k, v]) => {
    result += converter(k, v);
  });
  return result;
}

export function block(name, contents, converter) {
  return `\n${name} {${map(contents, converter)}\n}`;
}

function queryBlock(name, contents, converter) {
  return `\nquery {\n\n  ${name} {${map(contents, converter)}\n}}`;
}

export function blockList(array, blockName, contentConverter) {
  let result = "\n";
  array.forEach((elem) => {
    result += block(blockName, elem, contentConverter);
  });
  return result;
}

export function queryBlockList(array, contentConverter) {
  let result = ["\n"];
  array.forEach((elem) => {
    result.push(queryBlock("metric_query", elem, contentConverter));
  });
  result = result.join("");
  return result;
}

export function convertFromDefinition(definitionSet, k, v) {
  if (typeof definitionSet[k] !== "function") throw `Can't convert key '${k}'`;
  return definitionSet[k](v);
}
