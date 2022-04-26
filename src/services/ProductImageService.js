import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findAll = () => {
  return prisma.productImage.findMany();
};

const findOne = (id) => {
  return prisma.productImage.findUnique({ where: { id } });
};

const create = (data) => {
  return prisma.productImage.create({ data });
};

const update = (id, data) => {
  return prisma.productImage.update({ where: { id }, data });
};

const remove = (id) => {
  return prisma.productImage.delete({ where: { id } });
};

export const ProductImageService = { create, remove, update, findAll, findOne };
