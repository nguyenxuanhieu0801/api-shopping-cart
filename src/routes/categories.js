import { CategoryController } from "controllers/CategoryController";
import { Router } from "express";
import { checkRole } from "middlewares/checkRole";
import passport from "passport";

const router = Router();

router.get("/", passport.authenticate("jwt", { session: false }), checkRole, CategoryController.findAll);
router.get("/:categoryId", passport.authenticate("jwt", { session: false }), CategoryController.findOne);
router.post("/", passport.authenticate("jwt", { session: false }), CategoryController.create);
router.put("/:categoryId", passport.authenticate("jwt", { session: false }), CategoryController.update);
router.delete("/:categoryId", passport.authenticate("jwt", { session: false }), CategoryController.remove);

export const categoriesRoutes = router;
