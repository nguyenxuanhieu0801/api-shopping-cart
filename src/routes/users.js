import { UserController } from "controllers/UserController";
import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/", UserController.findAll);
router.post("/", UserController.create);
router.get("/:userId", UserController.findOne);
router.patch("/:userId", UserController.update);
router.delete("/:userId", passport.authenticate("jwt", { session: false }), UserController.remove);

export const usersRoutes = router;
