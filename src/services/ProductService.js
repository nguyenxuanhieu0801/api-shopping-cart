import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findAll = ({ page, limit = 1, sortBy = "id", orderBy = "asc", search = "" }) => {
  let offset = page * limit;
  let options = {
    include: {
      productImages: true,
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
  return prisma.product.findMany({ ...options });
};

const findOne = (id) => {
  return prisma.product.findUnique({ where: { id } });
};

const create = (data) => {
  return prisma.product.create({ data });
};

const update = (id, data) => {
  return prisma.product.update({ where: { id }, data });
};

const remove = (id) => {
  return prisma.product.delete({ where: { id } });
};

export const ProductService = { create, remove, update, findAll, findOne };
