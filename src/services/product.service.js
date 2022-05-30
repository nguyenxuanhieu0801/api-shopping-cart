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
      productImages: true,
    },
  };
  if (page != 0) {
    let offset = page * limit;
    options.skip = offset - limit;
    options.take = limit;
  }

  const count = await prisma.product.count({ where: { ...options.where } });
  const data = await prisma.product.findMany({ ...options });

  return pagination({ count, page, limit, data });
};

const findOne = (id) => {
  return prisma.product.findUnique({
    where: { id },
    include: {
      productImages: true,
    },
  });
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
