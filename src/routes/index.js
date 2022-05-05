import { Router } from "express";
import { authRoutes } from "./auth.route";
import { cartRoutes } from "./cart.route";
import { categoriesRoutes } from "./categories.route";
import { orderRoutes } from "./orders.route";
import { productsRoutes } from "./products.route";
import { userRoutes } from "./user.route";
import { usersRoutes } from "./users.route";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", usersRoutes);
routes.use("/user", userRoutes);
routes.use("/products", productsRoutes);
routes.use("/categories", categoriesRoutes);
routes.use("/cart", cartRoutes);
routes.use("/orders", orderRoutes);

export default routes;
