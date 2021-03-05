export function isEmptyObject(param:{}) {
  return Object.keys(param).length === 0 && param.constructor === Object;
}

export function toInt(data:any, defaultValue:any) {
  if ( data == null ) {
    return defaultValue;
  }

  return parseInt(data)
}

export function toIntOrUnd(data:any) {
  return toInt(data, undefined);
}

export function toIntOrNull(data:any) {
  return toInt(data, null);
}
