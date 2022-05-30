import { initPassport } from "auth/passport";
import { PORT } from "config/environment";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import createError from "http-errors";
import morgan from "morgan";
import routes from "routes";

//import { swaggerSpecs } from "config/swaggerJsDoc";
//import swaggerUI from "swagger-ui-express";

const app = express();
initPassport();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
//app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
app.use(routes);

app.use((req, res, next) => {
  next(createError.NotFound("This route does not exist"));
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    status,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Serving at ${PORT}`);
});
