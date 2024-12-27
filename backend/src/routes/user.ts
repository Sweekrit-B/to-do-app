import express from "express";
import * as UserController from "src/controllers/user";

const router = express.Router();

router.get("/:id", UserController.getUser);
router.post("/", UserController.createUser);

export default router;
