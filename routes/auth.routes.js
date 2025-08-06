import express from "express";
import { loginFn, signupFn, logoutFn } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signupFn);
router.post("/login", loginFn);
router.post("/logout", logoutFn);

export default router;
