import { authRoutes } from "./auth";
import { cartRoutes } from "./cart";
import { categoriesRoutes } from "./categories";
import { orderRoutes } from "./orders";
import { productsRoutes } from "./products";
import { userRoutes } from "./user";
import { usersRoutes } from "./users";

const routes = (app) => {
  app.use("/auth", authRoutes);
  app.use("/users", usersRoutes);
  app.use("/user", userRoutes);
  app.use("/products", productsRoutes);
  app.use("/categories", categoriesRoutes);
  app.use("/cart", cartRoutes);
  app.use("/orders", orderRoutes);
};

export default routes;
