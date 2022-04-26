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
  return prisma.order.findMany();
};

const find = (column) => {
  return prisma.order.findFirst({
    where: column,
    include: {
      orderDetails: true,
    },
  });
};

const create = (data) => {
  return prisma.order.create({ data });
};

const update = async (id, data) => {
  return prisma.order.update({ where: { id }, data });
};

const findOne = (id) => {
  return prisma.order.findUnique({
    where: { id },
    include: {
      orderDetails: true,
    },
  });
};

export const OrderService = { find, findAll, create, findOne, update };
