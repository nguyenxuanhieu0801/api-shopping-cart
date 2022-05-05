import { UserController } from "controllers/user.controller";
import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/profile", passport.authenticate("jwt", { session: false }), UserController.findAll);
router.get("/purchase", passport.authenticate("jwt", { session: false }), UserController.findAllOrder);
router.get("/purchase/:orderId", passport.authenticate("jwt", { session: false }), UserController.findOneOrder);
router.put("/purchase/:orderId", passport.authenticate("jwt", { session: false }), UserController.updateOrder);

export const userRoutes = router;
