import { CartController } from "controllers/cart.controller";
import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/", passport.authenticate("jwt", { session: false }), CartController.getCart);
router.post("/add", passport.authenticate("jwt", { session: false }), CartController.addToCart);
router.put("/update", passport.authenticate("jwt", { session: false }), CartController.updateCart);
router.delete("/delete", passport.authenticate("jwt", { session: false }), CartController.removeItem);

export const cartRoutes = router;
