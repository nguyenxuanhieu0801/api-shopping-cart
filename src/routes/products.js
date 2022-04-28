import { ProductController } from "controllers/ProductController";
import { ProductImageController } from "controllers/ProductImageController";

import { Router } from "express";
import upload from "middlewares/upload";
import passport from "passport";

const router = Router();

router.get("/", ProductController.findAll);
router.get("/:productId", passport.authenticate("jwt", { session: false }), ProductController.findOne);
router.post("/", passport.authenticate("jwt", { session: false }), ProductController.create);
router.put("/:productId", passport.authenticate("jwt", { session: false }), ProductController.update);
router.delete("/:productId", passport.authenticate("jwt", { session: false }), ProductController.remove);

router.post("/productImage/:productId", upload.array("image", 3), ProductImageController.create);
router.delete("/productImage/:productImageId", ProductImageController.remove);

export const productsRoutes = router;
