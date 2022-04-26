import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findAll = () => {
  return prisma.category.findMany();
};

const findOne = (id) => {
  return prisma.category.findUnique({ where: { id } });
};

const create = (data) => {
  return prisma.category.create({ data });
};

const update = (id, data) => {
  return prisma.category.update({ where: { id }, data });
};

const remove = (id) => {
  return prisma.category.delete({ where: { id } });
};

export const CategoryService = { create, remove, update, findAll, findOne };
