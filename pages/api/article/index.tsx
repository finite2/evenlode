import { NextApiRequest, NextApiResponse } from "next";

import { auth, catchErrorMiddleware, error, response } from "../../../lib/api-util";
import * as apiArticle from "../../../prisma/api-article";

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
  const articles = await apiArticle.listArticles();

  return response.json(res, articles);
};

const createArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await auth.isAdmin(req);

  const body = apiArticle.postArticleSchema.parse(req.body);

  const article = await apiArticle.createArticle(session.user.id, body);

  return response.json(res, article);
};
