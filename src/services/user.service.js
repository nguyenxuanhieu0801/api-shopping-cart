import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
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
      carts: true,
      orders: true,
    },
  };
  if (page != 0) {
    let offset = page * limit;
    options.skip = offset - limit;
    options.take = parseInt(limit);
  }

  const count = await prisma.user.count({ where: { ...options.where } });
  const data = await prisma.user.findMany({ ...options });

  return pagination({ count, page, limit, data });
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
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);
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
