import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findOne = (column, orderBy = { id: "desc" }) => {
  return prisma.token.findFirst({ where: column, orderBy });
};

const create = (data) => {
  return prisma.token.create({ data });
};

const remove = (id) => {
  return prisma.token.delete({ where: { id } });
};

export const TokenService = { findOne, create, remove };
