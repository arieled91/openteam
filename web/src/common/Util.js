export function isDefined(object) {
    return object!==undefined && object !== null && Object.keys(object).length !== 0;
}