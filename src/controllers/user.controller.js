import { HttpStatusCode } from "constants/HttpStatusCode";
import { OrderService } from "services/order.service";
import { UserService } from "services/user.service";
import createError from "http-errors";

const findAllOrder = async (req, res, next) => {
  const { page = 0, limit = 1, sortBy = "id", orderBy = "asc", search = "" } = req.query;
  const { user } = req;
  const orders = await UserService.getOrder({ id: user.id });
  return res.status(HttpStatusCode.OK).json({ orders });
};

const findOneOrder = async (req, res, next) => {
  const { user } = req;
  const orderId = parseInt(req.params.orderId);
  const order = await OrderService.find({ id: orderId, userId: user.id });
  if (!order)
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No order found with the orderId ${orderId} in user` });

  return res.status(HttpStatusCode.OK).json({ order });
};

const updateOrder = async (req, res) => {
  const { user } = req;

  const orderId = parseInt(req.params.orderId);
  const orders = await UserService.getOrder(user.id);
  const status = 2;
  let order = null;
  orders.forEach((item) => {
    if (item.id === orderId) order = { ...item };
  });

  if (!order)
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No order found with the orderId ${orderId} in user` });
  const orderUpdate = await OrderService.update(orderId, { ...order, status });

  return res.status(HttpStatusCode.OK).json({ order: orderUpdate });
};

const findAll = async (req, res) => {
  try {
    const { page = 0, limit = 1, sortBy = "id", orderBy = "asc", search = "" } = req.query;
    const results = await UserService.findAll({ search, page, limit, sortBy, orderBy });
    return res.status(HttpStatusCode.OK).json({ results });
  } catch (error) {
    next(createError.NotFound(error.message));
  }
};

const findOne = async (req, res, next) => {
  const userId = parseInt(req.params.userId);

  try {
    const { password, ...data } = await UserService.findOne(userId);
    if (!data) {
      next(createError.NotFound(`No user found with the id ${userId}`));
    }
    return res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    next(createError.NotFound(error.message));
  }
};

const create = async (req, res, next) => {
  try {
    const user = await UserService.create(req.body);
    return res.status(HttpStatusCode.OK).json({ user });
  } catch (error) {
    next(createError.NotFound(error.message));
  }
};

const update = async (req, res, next) => {
  const userId = parseInt(req.params.userId);

  try {
    const foundUser = await UserService.findOne(userId);
    if (!foundUser) next(createError.NotFound(`No user found with the id ${userId}`));

    const emailExists = await UserService.find({ email: req.body.email });
    if (emailExists) next(createError.NotFound(`User is already in use by ${req.body.email}`));

    const user = await UserService.update(userId, req.body);
    return res.status(HttpStatusCode.OK).json(user);
  } catch (error) {
    next(createError.NotFound(error.message));
  }
};

const remove = async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const user = await UserService.remove(userId);
    if (!user) {
      next(createError.NotFound(`No user found with the id ${userId}`));
    }
    return res.status(HttpStatusCode.OK).json(user);
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

export const UserController = {
  findAllOrder,
  findOneOrder,
  updateOrder,
  findAll,
  findOne,
  update,
  remove,
  create,
};
