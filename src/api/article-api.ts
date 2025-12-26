import { readFile } from 'node:fs/promises';

export type Article = {
  title: string;
  slug: string;
  date: string;
  body: string;
};

type ArticleDataFile = {
  articles: Article[];
};

const dataUrl = new URL('../../data/article-data.jsonc', import.meta.url);

const loadArticles = async (): Promise<Article[]> => {
  const raw = await readFile(dataUrl, 'utf-8');
  const parsed = JSON.parse(raw) as ArticleDataFile;
  return parsed.articles ?? [];
};

export const getAllArticles = async (): Promise<Article[]> => {
  return loadArticles();
};

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  const articles = await loadArticles();
  return articles.find((article) => article.slug === slug) ?? null;
};
