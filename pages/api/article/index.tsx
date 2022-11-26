import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { auth, catchErrorMiddleware, error, response } from "../../../lib/api-util";
import prisma from "../../../lib/prisma";

const postArticleSchema = z.object({
  body: z.object({
    isClubMessage: z.boolean().optional().default(true),
    title: z.string({ required_error: "title is a required field" }),
    body: z.string({ required_error: "body is a required field" }),
  }),
});

const articleHandler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return listArticles();
    case "POST":
      return createArticle();
    default:
      throw error.methodNotAllowed(req);
  }

  async function listArticles() {
    const articles = await prisma.article.findMany({
      where: {
        isClubMessage: true,
      },
      orderBy: { createdAt: "asc" },
      take: 5,
    });

    return response.json(res, articles);
  }

  async function createArticle() {
    const session = await auth.isAdmin(req);

    const { body } = postArticleSchema.parse(req);

    const article = await prisma.article.create({
      data: {
        ...body,
        user: { connect: { id: session.user.id } },
      },
    });

    return response.json(res, article);
  }
};

export default catchErrorMiddleware(articleHandler);
