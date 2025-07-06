/**
 * @title Get Post
 * @description Retorna um post específico com conteúdo completo
 */
import type { AppContext } from "../apps/site.ts";
import { BlogPost } from "apps/blog/types.ts";

export interface Props {
  /** @title Post do blog */
  post?: BlogPost;
}

/**
 * @title Get Post
 */
const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { post } = props;
  
  // Retorna o post completo se fornecido
  if (!post) {
    return null;
  }

  return post;
};

export default loader; 