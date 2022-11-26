import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { auth, catchErrorMiddleware, error, response } from "../../../lib/api-util";
import prisma from "../../../lib/prisma";

const updateArticleSchema = z.object({
  body: z.object({
    isClubMessage: z.boolean().optional().default(true),
    title: z.string({ required_error: "title is a required field" }),
    body: z.string({ required_error: "body is a required field" }),
  }),
  // query: z.object({
  //   id: z.preprocess((a) => parseInt(a as string), z.number()),
  // }),
});

const articleIDHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id as string);

  switch (req.method) {
    case "GET":
      return getArticle();
    case "PUT":
      return updateArticle();
    case "DELETE":
      return deleteArticle();
    default:
      return error.methodNotAllowed(req);
  }

  async function getArticle() {
    const article = await prisma.article.findUnique({ where: { id } });

    if (!article) throw error.objectNotFound404();

    return res.status(200).json(article);
  }

  async function updateArticle() {
    const { body } = updateArticleSchema.parse(req);

    const article = await prisma.article.findUnique({ where: { id } });

    await auth.isAdminOrOwner(req, article?.userId);

    if (!article) throw error.objectNotFound404();

    const updatedArticle = await prisma.article.update({
      data: body,
      where: { id },
    });

    return response.json(res, updatedArticle);
  }

  async function deleteArticle() {
    const article = await prisma.article.findUnique({ where: { id } });

    await auth.isAdminOrOwner(req, article?.userId);

    if (!article) throw error.objectNotFound404();

    await prisma.article.delete({ where: { id } });

    return res.status(200).end();
  }
};

export default catchErrorMiddleware(articleIDHandler);
