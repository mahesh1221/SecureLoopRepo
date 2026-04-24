/**
 * Lightweight classnames merger — zero dependencies.
 * Filters out falsy values and joins truthy ones with a space.
 */
export function cn(
  ...args: Array<string | number | false | null | undefined>
): string {
  return args.filter(Boolean).join(' ');
}
