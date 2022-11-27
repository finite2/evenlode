import { Role, UserFindManyArgs } from "@prisma/client";
import prisma from "../lib/prisma";

export const listUsers = async (searchString?: string, role?: Role | "club") => {
  let query = {
    where: {},
    orderBy: { name: "desc" },
  } as UserFindManyArgs;

  if (searchString) {
    query.where.name = {
      contains: searchString,
      mode: "insensitive",
    };
  }

  if (role === "club") {
    query.where.NOT = {
      role: Role.VISITOR,
    };
  } else if (role) {
    query.where.role = role;
  }

  const users = await prisma.user.findMany(query);

  return users;
};

export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      name: true,
      role: true,
      committeeTitle: true,
    },
  });

  return user;
};

export const setUserRole = async (id: string, role: Role) => {
  const user = await prisma.user.update({
    where: { id },
    data: {
      role,
    },
  });

  return user;
};

export const setCommiteeTitle = async (id: string, committeeTitle: string) => {
  const user = await prisma.user.update({
    where: { id },
    data: {
      committeeTitle,
    },
  });

  return user;
};
