import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { auth, catchErrorMiddleware, error, response } from "../../../lib/api-util";
import prisma from "../../../lib/prisma";

const articleHandler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return listArticles(req, res);
    case "POST":
      return createArticle(req, res);
    default:
      throw error.methodNotAllowed(req);
  }
};

export default catchErrorMiddleware(articleHandler);

const listArticles = async (req: NextApiRequest, res: NextApiResponse) => {
  const articles = await prisma.article.findMany({
    where: {
      isClubMessage: true,
    },
    orderBy: { createdAt: "asc" },
    take: 5,
  });

  return response.json(res, articles);
};

const postArticleSchema = z.object({
  body: z.object({
    isClubMessage: z.boolean().optional().default(true),
    title: z.string(),
    body: z.string(),
  }),
});

const createArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await auth.isAdmin(req);

  const { body } = postArticleSchema.parse(req);

  const article = await prisma.article.create({
    data: {
      ...body,
      user: { connect: { id: session.user.id } },
    },
  });

  return response.json(res, article);
};
