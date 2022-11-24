import { Article } from "@prisma/client";

import { RenderArticle } from "../components/Article";
import { HorizontalLine } from "../components/horizontal-line";

import { externalLinks } from "../config/external-links";

import prisma from "../lib/prisma";

const HomePage = async () => {
  const articles: Article[] = await prisma.article.findMany({
    where: {
      isClubMessage: true,
    },
    orderBy: { createdAt: "asc" },
    take: 5,
  });

  return (
    <>
      <h1>Welcome to Evenlode Badminton Club</h1>
      <h3>
        Evenlode Badminton Club is one of the oldest badminton clubs in Abingdon and was established
        nearly 60 years ago.
      </h3>
      <p>
        The club plays on a Monday night at St Helen and St Katherine School, Faringdon Road in
        Abingdon. The Club plays social and league badminton during the months of September to
        April. We also run a Summer Club from July to August. If you would like to learn more about
        us, click on one of the menu items above.
      </p>
      <p>
        Evenlode Badminton Club is a member of the{" "}
        <a href={externalLinks.oxfordBadmintonLeague}>Oxfordshire Badminton League.</a>
      </p>

      <HorizontalLine />
      <h2>News</h2>
      {articles.map((article) => {
        return <RenderArticle key={article.id} article={article} />;
      })}
    </>
  );
};

export default HomePage;
