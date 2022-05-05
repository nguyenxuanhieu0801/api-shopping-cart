import { HttpStatusCode } from "constants/HttpStatusCode";
import { CartService } from "services/cart.service";
import { UserService } from "services/user.service";

import { ProductService } from "services/product.service";

const getCart = async (req, res) => {
  const { user } = req;

  const carts = await UserService.getCart(user.id);
  return res.status(HttpStatusCode.OK).json({ carts });
};

const addToCart = async (req, res) => {
  const { user } = req;
  const quantity = parseInt(req.body.quantity);
  const productId = parseInt(req.body.productId);

  try {
    const product = await ProductService.findOne(productId);
    if (!product)
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No product found with the productId ${productId}` });
    const foundCart = await CartService.find({ userId: user.id, productId: productId });

    if (foundCart) {
      let newQuantity = foundCart.quantity + quantity;
      const cart = await CartService.update(foundCart.id, { quantity: newQuantity });
      return res.status(HttpStatusCode.OK).json({ cart });
    } else {
      const data = {
        userId: user.id,
        productId: product.id,
        price: product.price,
        quantity,
      };
      const cart = await CartService.create(data);
      return res.status(HttpStatusCode.OK).json({ cart });
    }
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
  const { user } = req;
  const quantity = parseInt(req.body.quantity);
  const productId = parseInt(req.body.productId);

  try {
    const product = await ProductService.findOne(productId);

    if (!product)
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No product found with the productId ${productId}` });

    const foundCart = await CartService.find({ userId: user.id, productId: productId });
    console.log(foundCart);
    if (!foundCart)
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No cart found with the userId ${user.id}` });

    const cart = await CartService.update(foundCart.id, { quantity });
    if (cart.quantity === 0) await CartService.remove(cart.id);
    return res.status(HttpStatusCode.OK).json(cart);
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

const removeItem = async (req, res) => {
  const { user } = req;

  const productId = parseInt(req.body.productId);

  try {
    const product = await ProductService.findOne(productId);
    if (!product)
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No product found with the productId ${productId}` });

    const foundCart = await CartService.find({ userId: user.id, productId: productId });
    if (!foundCart)
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No cart found with the userId ${user.id}` });

    const cart = await CartService.remove(foundCart.id);

    return res.status(HttpStatusCode.OK).json({ message: "Delete product in cart successfully", cart });
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

export const CartController = { getCart, addToCart, updateCart, removeItem };
