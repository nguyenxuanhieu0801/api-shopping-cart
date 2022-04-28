import { HttpStatusCode } from "constants/HttpStatusCode";

export const checkRole = (req, res, next) => {
  const { user } = req;
  if (user.role === "USER") {
    return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
  }
  next();
};
