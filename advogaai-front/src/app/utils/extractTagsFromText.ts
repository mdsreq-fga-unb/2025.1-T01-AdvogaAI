export function extractTagsFromText(text: string): string[] {
  const regex = /{{\s*([^}]+?)\s*}}/g;
  const matches = text.match(regex) || [];

  const uniqueKeys = new Set(
    matches.map((tag) => tag.replace(/{{|}}/g, '').trim()),
  );

  return Array.from(uniqueKeys);
}
