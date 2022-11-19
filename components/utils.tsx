export function classes(...rest: Array<string | undefined>) {
  return [...rest].filter(Boolean).join(" ");
}
