import { initPassport } from "auth/passport";
import { PORT } from "config/environment";
import { swaggerSpecs } from "config/swaggerJsDoc";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import passport from "passport";
import routes from "routes";
//import swaggerUI from "swagger-ui-express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
//app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

initPassport();
routes(app);

app.listen(PORT, () => {
  console.log(`Serving at ${PORT}`);
});
