import { CartController } from "controllers/CartController";
import { Router } from "express";

const router = Router();

router.get("/", CartController.getCart);
router.post("/add", CartController.addToCart);
router.put("/update", CartController.updateCart);
router.delete("/delete", CartController.removeItem);

export const cartRoutes = router;
