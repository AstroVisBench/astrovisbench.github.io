import { getCollection } from "astro:content";

export const index_post = (await getCollection("index")).sort((a, b) =>
  new Date(a.data.date).valueOf() > new Date(b.data.date).valueOf() ? -1 : 1,
)[0];