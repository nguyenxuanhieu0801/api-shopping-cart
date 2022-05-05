import { UserController } from "controllers/user.controller";
import { Router } from "express";
import passport from "passport";
import { UserValidation } from "validations/user.validation";

const router = Router();

router.get("/", UserController.findAll);
router.get("/:userId", passport.authenticate("jwt", { session: false }), UserController.findOne);
router.post("/", passport.authenticate("jwt", { session: false }), UserValidation.create, UserController.create);
router.patch(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  UserValidation.update,
  UserController.update
);
router.delete("/:userId", passport.authenticate("jwt", { session: false }), UserController.remove);

export const usersRoutes = router;
