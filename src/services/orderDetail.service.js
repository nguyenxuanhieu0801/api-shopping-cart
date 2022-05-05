import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = (data) => {
  return prisma.orderDetail.create({ data });
};

export const OrderDetailService = { create };
