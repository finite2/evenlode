import { Article } from "@prisma/client";
import { z } from "zod";
import prisma from "../lib/prisma";

export type ArticleWithUser = Article & {
  user: {
    name: string | null;
    committeeTitle: string | null;
  };
};

export const listArticles = async () => {
  const articles = await prisma.article.findMany({
    where: {
      isClubMessage: true,
    },
    orderBy: { createdAt: "asc" },
    include: {
      user: {
        select: {
          name: true,
          role: true,
          committeeTitle: true,
        },
      },
    },
    take: 5,
  });

  return articles;
};

export const postArticleSchema = z.object({
  isClubMessage: z.boolean().optional().default(true),
  title: z.string(),
  body: z.string(),
});

type postArticleSchema = z.infer<typeof postArticleSchema>;

export const createArticle = async (userID: string, body: postArticleSchema) => {
  const article = await prisma.article.create({
    data: {
      ...body,
      user: { connect: { id: userID } },
    },
  });

  return article;
};

export const getArticle = async (id: number) => {
  const article = await prisma.article.findUnique({ where: { id } });

  return article;
};

export const updateArticleSchema = z.object({
  isClubMessage: z.boolean().optional().default(true),
  title: z.string(),
  body: z.string(),
});

export type updateArticleSchema = z.infer<typeof updateArticleSchema>;

export const updateArticle = async (id: number, body: updateArticleSchema) => {
  const updatedArticle = await prisma.article.update({
    data: body,
    where: { id },
  });

  return updatedArticle;
};

export const deleteArticle = async (id: number) => {
  await prisma.article.delete({ where: { id } });

  return true;
};
