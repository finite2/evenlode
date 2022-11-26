import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { auth, catchErrorMiddleware, error, response } from "../../../lib/api-util";
import prisma from "../../../lib/prisma";

const articleIDHandler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return getArticle(req, res);
    case "PUT":
      return updateArticle(req, res);
    case "DELETE":
      return deleteArticle(req, res);
    default:
      return error.methodNotAllowed(req);
  }
};

export default catchErrorMiddleware(articleIDHandler);

const getArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id as string);

  const article = await prisma.article.findUnique({ where: { id } });

  if (!article) throw error.objectNotFound404();

  return response.json(res, article);
};

const updateArticleSchema = z.object({
  body: z.object({
    isClubMessage: z.boolean().optional().default(true),
    title: z.string(),
    body: z.string(),
  }),
  query: z.object({
    id: z.preprocess((a) => parseInt(a as string), z.number()),
  }),
});

const updateArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body,
    query: { id },
  } = updateArticleSchema.parse(req);

  const article = await prisma.article.findUnique({ where: { id } });

  await auth.isAdminOrOwner(req, article?.userId);

  if (!article) throw error.objectNotFound404();

  const updatedArticle = await prisma.article.update({
    data: body,
    where: { id },
  });

  return response.json(res, updatedArticle);
};

const deleteArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id as string);

  const article = await prisma.article.findUnique({ where: { id } });

  await auth.isAdminOrOwner(req, article?.userId);

  if (!article) throw error.objectNotFound404();

  await prisma.article.delete({ where: { id } });

  return response.ok(res);
};
