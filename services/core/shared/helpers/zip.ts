export function zip(...arrays: any[]) {
  return Array(Math.max(...arrays.map((arr: any[]) => arr.length)))
    .fill(0)
    .map((_, index) => arrays.map((arr: any[]) => arr[index]));
}