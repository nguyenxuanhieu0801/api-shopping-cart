import { PrismaClient } from "@prisma/client";
import { pagination } from "utils/pagination";

const prisma = new PrismaClient();

const findAll = async ({ page, limit, sortBy, orderBy, search }) => {
  let options = {
    where: {
      name: { contains: search },
    },
    orderBy: {
      [sortBy]: orderBy,
    },
    include: {
      products: true,
    },
  };
  if (page != 0) {
    let offset = page * limit;
    options.skip = offset - limit;
    options.take = parseInt(limit);
  }

  const count = await prisma.category.count({ where: { ...options.where } });
  const data = await prisma.category.findMany({ ...options });

  return pagination({ count, page, limit, data });
};

const findOne = (id) => {
  return prisma.category.findUnique({
    where: { id },
    include: {
      products: true,
    },
  });
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
