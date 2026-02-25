export const toSlug = (text: string) => text.replace(/\s+/g, "-");
export const fromSlug = (slug: string) => slug.replace(/-/g, " ");
