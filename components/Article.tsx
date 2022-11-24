import { Article } from "@prisma/client";
import sanitizeHtml from "sanitize-html";
export const RenderArticle = ({ article }: { article: Article }) => {
  const { id, title, body, isClubMessage, userId } = article;

  const sanitisedBody = sanitizeHtml(body);

  console.log(isClubMessage);

  return (
    <article>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: sanitisedBody }}></div>
    </article>
  );
};
