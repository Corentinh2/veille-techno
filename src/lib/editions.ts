import { getCollection, type CollectionEntry } from 'astro:content';
import { byDateThenImportance, editionId, importanceRank, scoreTotal } from './veille';

export type Edition = {
  id: string;
  articles: CollectionEntry<'articles'>[];
  chapeau?: CollectionEntry<'editions'>;
};

/** Regroupe les articles par semaine ISO, de la plus récente à la plus ancienne. */
export async function getEditions(): Promise<Edition[]> {
  const articles = (await getCollection('articles')).sort(byDateThenImportance);
  const chapeaux = await getCollection('editions');
  const map = new Map<string, CollectionEntry<'articles'>[]>();
  for (const a of articles) {
    const id = editionId(a.data.date);
    if (!map.has(id)) map.set(id, []);
    map.get(id)!.push(a);
  }
  return [...map.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([id, list]) => ({
      id,
      // Dans une édition : par importance puis par score.
      articles: list.sort(
        (a, b) =>
          importanceRank(a.data.importance) - importanceRank(b.data.importance) ||
          scoreTotal(b.data.score) - scoreTotal(a.data.score),
      ),
      chapeau: chapeaux.find((c) => c.id === id),
    }));
}
