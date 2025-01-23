// test a value
function isHeading(keyName) {
  return /heading/gi.test(keyName)
}

function isSchoolName(keyName) {
  return /school|[eé]cole/gi.test(keyName)
}

function isBoolean(value) {
  return value === true || value === false
}

function isFloat(value) {
 if (typeof value === "number")  return Math.floor(value) != value
  }

function isInteger(value) {
 if (typeof value === "number") return Math.floor(value) === value;
}

export {isHeading, isBoolean, isSchoolName, isFloat, isInteger };
