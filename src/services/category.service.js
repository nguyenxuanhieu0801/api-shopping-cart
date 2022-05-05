import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findAll = ({ page, limit = 1, sortBy = "id", orderBy = "asc", search = "" }) => {
  let offset = page * limit;
  let options = {
    include: {
      products: true,
    },
    orderBy: {
      [sortBy]: orderBy,
    },
  };
  if (page) {
    options.skip = offset - limit;
    options.take = parseInt(limit);
  }
  if (search)
    options.where = {
      name: { contains: search },
    };
  return prisma.category.findMany({ ...options });
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
