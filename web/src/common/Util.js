export function isDefined(object) {
    return object!==undefined && object !== null && Object.keys(object).length !== 0;
}


export function isDefinedString(s) {
  return s && typeof s === 'string'
}