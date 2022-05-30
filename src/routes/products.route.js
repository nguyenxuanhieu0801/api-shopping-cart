import { ProductController } from "controllers/product.controller";
import { ProductImageController } from "controllers/productImage.controller";

import { Router } from "express";
import upload from "middlewares/upload";
import passport from "passport";
import { ProductValidation } from "validations/product.validation";

const router = Router();

router.get("/", ProductController.findAll);
router.get("/:productId", 
// passport.authenticate("jwt", { session: false }), 
ProductController.findOne);
router.post("/", passport.authenticate("jwt", { session: false }), ProductValidation.create, ProductController.create);
router.put(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  ProductValidation.update,
  ProductController.update
);
router.delete("/:productId", passport.authenticate("jwt", { session: false }), ProductController.remove);
//ProductImage
router.post("/productImage/:productId", upload.array("image", 3), ProductImageController.create);
router.delete("/productImage/:productImageId", ProductImageController.remove);

export const productsRoutes = router;
