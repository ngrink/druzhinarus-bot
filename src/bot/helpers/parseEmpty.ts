export const parseEmpty = <T>(value: T): T | undefined => {
  if (value === "-") {
    return undefined;
  }

  return value;
}