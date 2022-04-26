import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const findAll = () => {
  return prisma.user.findMany({
    include: {
      carts: true,
    },
  });
};

const findOne = (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

const getCart = async ({ id, page, limit = 1, sortBy = "id", orderBy = "asc" }) => {
  let offset = page * limit;
  let options = {
    include: {
      products: true,
    },
    orderBy: {
      [sortBy]: orderBy,
    },
  };

  const { carts } = await prisma.user.findUnique({
    where: { id },
    select: { carts: true },
  });

  return carts;
};

const getOrder = async (id) => {
  const { orders } = await prisma.user.findUnique({
    where: { id },
    select: { orders: true },
  });
  return orders;
};

const find = (column) => {
  return prisma.user.findFirst({ where: column });
};

const create = async (data) => {
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);
  return prisma.user.create({ data });
};

const update = async (id, data) => {
  return prisma.user.update({ where: { id }, data });
};

const updateRefreshToken = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data: {
      refreshToken: data,
    },
  });
};

const remove = (id) => {
  return prisma.user.delete({ where: { id } });
};

const deleteTokensOfUser = (id) => {
  return prisma.user.update({
    where: { id },
    data: {
      tokens: {
        deleteMany: {},
      },
    },
  });
};

const deleteCartsOfUser = (id) => {
  return prisma.user.update({
    where: { id },
    data: {
      carts: {
        deleteMany: {},
      },
    },
  });
};

export const UserService = {
  create,
  find,
  getCart,
  getOrder,
  findAll,
  findOne,
  update,
  remove,
  deleteTokensOfUser,
  deleteCartsOfUser,
  updateRefreshToken,
};
