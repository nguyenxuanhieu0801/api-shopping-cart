import { HttpStatusCode } from "constants/HttpStatusCode";
import { OrderService } from "services/order.service";
import { UserService } from "services/user.service";

const findAllOrder = async (req, res, next) => {
  const { page, limit, sortBy, orderBy, search } = req.query;
  const { user } = req;
  const orders = await UserService.getOrder({ id: user.id });
  return res.status(HttpStatusCode.OK).json({ orders });
};

const findOneOrder = async (req, res) => {
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
  const users = await UserService.findAll();
  return res.status(HttpStatusCode.OK).json({ users });
};

const findOne = async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const user = await UserService.findOne(userId);
    if (user) {
      return res.status(HttpStatusCode.OK).json(user);
    } else {
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No user found with the id ${userId}` });
    }
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const user = await UserService.create(req.body);
    return res.status(HttpStatusCode.OK).json({ user });
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const foundUser = await UserService.findOne(userId);
    if (!foundUser)
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No user found with the id ${userId}` });

    const emailExists = await UserService.find({ email: req.body.email });
    if (emailExists)
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `User is already in use by ${req.body.email}` });

    const user = await UserService.update(userId, req.body);
    return res.status(HttpStatusCode.OK).json(user);
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const user = await UserService.remove(userId);
    if (user) {
      return res.status(HttpStatusCode.OK).json(user);
    } else {
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No user found with the id ${userId}` });
    }
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
