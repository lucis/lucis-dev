/**
 * @title Get Blog Posts
 * @description Retorna lista de posts do blog com conteúdo truncado
 */
import type { AppContext } from "../apps/site.ts";
import { BlogPost } from "apps/blog/types.ts";

export interface Props {
  /** @title Posts do blog */
  posts?: BlogPost[];
}

export interface BlogPostSummary {
  /** @title Slug do post */
  slug: string;
  /** @title Título */
  title: string;
  /** @title Resumo do conteúdo (50 chars) */
  content: string;
  /** @title Data de publicação */
  date?: string;
  /** @title Autor */
  author?: string;
  /** @title Autores */
  authors?: Array<{
    name: string;
    email?: string;
    avatar?: string;
    jobTitle?: string;
    company?: string;
  }>;
  /** @title Tags */
  tags?: string[];
  /** @title Categorias */
  categories?: Array<{
    name: string;
    slug: string;
  }>;
  /** @title URL da imagem */
  image?: string;
  /** @title Resumo */
  excerpt?: string;
}

/**
 * @title Get Blog Posts
 */
const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { posts = [] } = props;
  
  // Trunca o conteúdo de cada post para 50 caracteres
  const truncatedPosts: BlogPostSummary[] = posts.map((post: BlogPost) => ({
    slug: post.slug,
    title: post.title,
    content: post.content ? post.content.substring(0, 50) + (post.content.length > 50 ? '...' : '') : '',
    date: post.date,
    author: post.authors?.[0]?.name,
    authors: post.authors,
    tags: post.categories?.map(cat => cat.name) || [],
    categories: post.categories,
    image: post.image,
    excerpt: post.excerpt,
  }));

  return truncatedPosts;
};

export default loader; 