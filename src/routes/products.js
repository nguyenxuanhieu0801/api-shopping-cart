import { ProductController } from "controllers/ProductController";
import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/", ProductController.findAll);
router.get("/:productId", passport.authenticate("jwt", { session: false }), ProductController.findOne);
router.post("/", passport.authenticate("jwt", { session: false }), ProductController.create);
router.put("/:productId", passport.authenticate("jwt", { session: false }), ProductController.update);
router.delete("/:productId", passport.authenticate("jwt", { session: false }), ProductController.remove);

export const productsRoutes = router;
