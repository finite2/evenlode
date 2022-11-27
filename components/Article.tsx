import sanitizeHtml from "sanitize-html";

import { ArticleWithUser } from "../prisma/api-article";

export const RenderArticle = ({ article }: { article: ArticleWithUser }) => {
  const { id, title, body, isClubMessage, user } = article;

  const sanitisedBody = sanitizeHtml(body);

  return (
    <article>
      <h2>{title}</h2>
      <p>
        {isClubMessage && (
          <>
            <b>Evenlode BC</b> ({user.name})
          </>
        )}
        {!isClubMessage && <b>{user.name}</b>}
      </p>
      <div dangerouslySetInnerHTML={{ __html: sanitisedBody }}></div>
    </article>
  );
};
