import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findAll = () => {
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
