import { Router } from "express";
import passport from "passport";
import { AuthController } from "controllers/auth.controller";

const routes = Router();

routes.post("/login", passport.authenticate("local", { session: false }), AuthController.login);
routes.post("/register", AuthController.register);
routes.get("/refreshToken", AuthController.handleRefeshToken);
routes.get("/logout", AuthController.logout);

export const authRoutes = routes;
