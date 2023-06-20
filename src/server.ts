// packages imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import { StatusCodes } from "http-status-codes";

// module declarations
import "./express-ts-formatter";

// module imports

// util imports
import CommonUtil from "./modules/common/common.util";

// middleware imports
import ErrorMiddleware from "./modules/error/error.middleware";

// route imports
import UserRoutes from "./user/user.route";

// import errors
import NotFoundError from "./modules/error/error.classes/NotFoundError";

// other imports
import constants from "./constants";
import config from "./config/db.config";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(cors());

// ping server
app.get(constants.API.PREFIX.concat("/ping"), (req, res, next) => {
  res.status(StatusCodes.OK).json({ message: "pong" });
});

// route declarations
app.use(constants.API.PREFIX.concat("/users"), UserRoutes);

// not found route
app.use((req, res, next) => {
  throw new NotFoundError("API Endpoint Not Found!");
});

// error handler middleware
app.use(ErrorMiddleware.errorHandler);

const start = async () => {
  try {
    // const dbConig = config.getDBConfig();
    // await CommonUtil.connectDB(dbConig.MONGODB_URL);

    const port = process.env.SERVER_PORT || constants.SERVER.PORT;

    const server = app.listen(port, () => {
      console.log(`SERVER IS LISTENING ON PORT ${port}...`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
