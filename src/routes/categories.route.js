import { CategoryController } from "controllers/category.controller";
import { Router } from "express";
import passport from "passport";
import { CategoryValidation } from "validations/category.validation";

const router = Router();

router.get("/", CategoryController.findAll);
router.get("/:categoryId", passport.authenticate("jwt", { session: false }), CategoryController.findOne);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  CategoryValidation.create,
  CategoryController.create
);
router.put(
  "/:categoryId",
  passport.authenticate("jwt", { session: false }),
  CategoryValidation.update,
  CategoryController.update
);
router.delete("/:categoryId", passport.authenticate("jwt", { session: false }), CategoryController.remove);

export const categoriesRoutes = router;
