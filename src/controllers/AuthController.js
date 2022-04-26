import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "config/environment";
import { TokenService } from "services/TokenService";
import { createUser, deleteAllTokenOfUser, getUserByEmail, getUserById } from "services/UserService";
import jwt from "jsonwebtoken";
import { HttpStatusCode } from "constants/HttpStatusCode";

const encodedToken = (type, data) => {
  return jwt.sign(
    {
      ...data,
    },
    type === "accessToken" ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET,
    {
      expiresIn: type === "accessToken" ? "15s" : "10d",
    }
  );
};

const login = async (req, res) => {
  const { password, ...user } = req.user;

  const accessToken = encodedToken("accessToken", data);
  const refreshToken = encodedToken("refreshToken", data);
  const expiredAt = new Date();
  expiredAt.setDate(expiredAt.getDate() + 7);
  await TokenService.create({
    userId: user.id,
    token: refreshToken,
    expiredAt,
  });

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    path: "/",
    secure: false,
    sameSite: "strict",
  });
  return res.status(HttpStatusCode.OK).json({ accessToken });
};

const register = async (req, res) => {
  try {
    const foundUser = await getUserByEmail(req.body.email);
    if (foundUser) return res.status(HttpStatusCode.FORBIDDEN).json({ error: { message: "Email is already in use." } });
    const user = await createUser(req.body);
    const accessToken = encodedToken("accessToken", user);

    return res.status(HttpStatusCode.OK).json({ accessToken });
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ error: { message: error.message } });
  }
};

const handleRefeshToken = async (req, res) => {
  const refreshToken = req.cookies.jwt;
  if (!refreshToken) return res.sendStatus(HttpStatusCode.UNAUTHORIZED);

  const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

  const existingUser = await getUserById(payload.id);
  if (!existingUser) return res.sendStatus(HttpStatusCode.UNAUTHORIZED);

  await deleteTokensOfUser(existingUser.id);
  const { password, ...data } = existingUser;

  const newRefreshToken = encodedToken("refreshToken", data);
  const newAccessToken = encodedToken("accessToken", data);

  const expiredAt = new Date();
  expiredAt.setDate(expiredAt.getDate() + 7);
  await TokenService.create({
    userId: existingUser.id,
    token: refreshToken,
    expiredAt,
  });

  res.cookie("jwt", newRefreshToken, {
    httpOnly: true,
    path: "/",
    secure: false,
    sameSite: "strict",
  });

  return res.status(HttpStatusCode.OK).json({
    accessToken: newAccessToken,
  });
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.jwt;

  const existingToken = await TokenService.findOne({
    token: refreshToken,
  });

  await TokenService.remove(existingToken.id);

  res.clearCookie("jwt", {
    httpOnly: true,
    path: "/",
    secure: false,
    sameSite: "strict",
  });

  res.status(HttpStatusCode.OK).json({ success: true });
};

export const AuthController = { login, logout, register, handleRefeshToken };