import { startCase } from "lodash";

export function toTitleCase(s: string) {
  return startCase(s.replace(/([A-Z])/g, " $1"));
}
