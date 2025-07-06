/**
 * @title Home Loader
 * @description Retorna informações da página inicial
 */
export interface HomeData {
  text: string;
  url: string;
}

export interface Props {
  /** @title URL da página inicial */
  url?: string;
}

/**
 * @title Home
 */
const loader = (props: Props): HomeData => {
  const url = props.url || "https://lucis.dev/";
  
  const text = `Blog pessoal de Luciano Júnior (lucis.dev)
  
Sou CTO da deco.cx, uma empresa brasileira focada em democratizar a tecnologia web. Trabalho com desenvolvimento de software, especialmente com tecnologias web modernas como Fresh, Deno e tecnologias de front-end.

Este blog é onde compartilho reflexões sobre:
- Desenvolvimento de software e tecnologia
- Carreira e crescimento profissional
- Cultura e sociedade brasileira
- Educação e aprendizado
- Empreendedorismo e startups

Alguns dos tópicos que escrevo sobre incluem histórias sobre o Brasil, dicas de carreira para engenheiros, reflexões sobre cultura brasileira, tecnologia e web development, além de análises sobre educação e pensadores como Paulo Freire e Steve Jobs.

Acredito no potencial do Brasil e dos brasileiros para construir um futuro extraordinário através da tecnologia e da educação.`;

  return {
    text,
    url
  };
};

export default loader;
