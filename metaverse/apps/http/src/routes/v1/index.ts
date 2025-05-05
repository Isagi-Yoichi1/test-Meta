import { Router } from "express";
import { userRouter } from "./user";
import { adminRouter } from "./admin";
import { spaceRouter } from "./space";
import { SignupSchema } from "../../types";
import { SigninSchema } from "../../types";
import { compare, hash } from "../../scrypt";
import client from "@repo/db/client";
export const router = Router();
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../../config";

router.post("/signup", async (req, res) => {
  const parsedData = SignupSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "Validation failed",
    });
    return;
  }

  const hashedPassword = await hash(parsedData.data.password);

  try {
    const user = await client.user.create({
      data: {
        username: parsedData.data.username,
        password: hashedPassword,
        role: parsedData.data.type === "admin" ? "Admin" : "User",
      },
    });
    res.json({
      userId: user.id,
    });
  } catch (e) {
    res.status(400).json({
      message: "User already exsists",
    });
  }
});
router.post("/signin", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(403).json({
      message: "Validation failed",
    });
    return;
  }

  try {
    const user = await client.user.findUnique({
      where: {
        username: parsedData.data.username,
      },
    });

    if (!user) {
      res.status(403).json({
        message: "User not found",
      });
      return;
    }

    const isValid = await compare(parsedData.data.password, user.password);

    if (!isValid) {
      res.status(403).json({
        message: "Incorrect password",
      });
      return;
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_PASSWORD);

    res.json({
      token: token,
    });
  } catch (e) {
    res.status(400).json({
      message: "Internal server error",
    });
  }
});

router.get("/element", (req, res) => {});

router.get("/avatars", (req, res) => {});

router.use("/user", userRouter);
router.use("/space", spaceRouter);
router.use("/admin", adminRouter);
