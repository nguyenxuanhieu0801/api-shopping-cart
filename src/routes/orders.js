import { OrderController } from "controllers/OrderController";
import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/", passport.authenticate("jwt", { session: false }), OrderController.findAll);
router.get("/:orderId", passport.authenticate("jwt", { session: false }), OrderController.findOne);
router.post("/add", passport.authenticate("jwt", { session: false }), OrderController.addOrder);

export const orderRoutes = router;
