import express from "express";
import UserController from "./user.controller";
import UserMiddleware from "./user.middleware";

const router = express.Router();

// setup intent to save a new card
router.post(
  "/",
  UserMiddleware.validateUserCreationInputs,
  UserController.createUser
);

router.get("/:id", UserController.getUserById);

export default router;
