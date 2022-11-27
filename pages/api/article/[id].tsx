import { NextApiRequest, NextApiResponse } from "next";

import { auth, catchErrorMiddleware, error, response } from "../../../lib/api-util";
import * as apiArticle from "../../../prisma/api-article";

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

  const article = await apiArticle.getArticle(id);

  if (!article) throw error.objectNotFound404();

  return response.json(res, article);
};

const updateArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id as string);
  const body = apiArticle.updateArticleSchema.parse(req);

  const article = await apiArticle.getArticle(id);

  await auth.isAdminOrOwner(req, article?.userId);

  if (!article) throw error.objectNotFound404();

  const updatedArticle = await apiArticle.updateArticle(id, body);

  return response.json(res, updatedArticle);
};

const deleteArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id as string);

  const article = await apiArticle.getArticle(id);

  await auth.isAdminOrOwner(req, article?.userId);

  if (!article) throw error.objectNotFound404();

  await apiArticle.deleteArticle(id);

  return response.ok(res);
};
