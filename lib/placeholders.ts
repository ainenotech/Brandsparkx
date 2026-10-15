import { SHOW_PLACEHOLDER_CONTENT } from "@/content/site";

/** Items marked `published: false` are only shown while placeholder content is switched on. */
export function visible<T extends { published: boolean }>(items: T[]): T[] {
  return SHOW_PLACEHOLDER_CONTENT ? items : items.filter((item) => item.published);
}
