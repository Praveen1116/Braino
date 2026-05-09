import express from "express";
import * as z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import { ContentModel, LinkModel, UserModel } from "./db";
import { userMiddleWare } from "./userMiddleware";
import mongoose from "mongoose";
import { random } from "./utils";
import { JWT_SECRET } from "./config";
const app = express();
app.use(express.json());

app.use(cors())

const requiredBody = z.object({
  username: z.string().min(2).max(10),
  password: z
    .string()
    .min(8, "The password must be atleast 8 characters!")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/,
      "Password must contain atleast one uppercase, one lowercase, one special charcter and one number"
    ),
});

type SignupBody = z.infer<typeof requiredBody>;

app.post(
  "/api/v1/braino/signup",
  async (req: express.Request<{}, {}, SignupBody>, res) => {
    const parsedData = requiredBody.safeParse(req.body);

    if (!parsedData.success) {
      res
        .status(400)
        .json({ message: "Invalid input format", errors: parsedData.error });
      return;
    }

    const { username, password } = parsedData.data;

    const user = await UserModel.findOne({ username });

    if (user) {
      res.status(409).json({ message: "User already exists" });
    } else {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({
          username,
          password: hashedPassword,
        });

        res.status(200).json({ message: "You are signed up!" });
      } catch (e) {
        res.status(411).json({ message: e });
      }
    }
  }
);

app.post(
  "/api/v1/braino/signin",
  async (req: express.Request<{}, {}, SignupBody>, res) => {
    const parsedData = requiredBody.safeParse(req.body);

    if (!parsedData.success) {
      res.status(404).json({
        message: "Invalid credentials or Invalid input format",
        errors: parsedData.error,
      });
      return;
    }

    const { username, password } = parsedData.data;

    const User = await UserModel.findOne({ username });

    if (!User) {
      res.status(411).json({ message: "Couldn't found user" });
      return;
    } else {
      const isPasswordValid = await bcrypt.compare(password, User.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid cred's" });
      }
      try {
        const token = jwt.sign(
          {
            id: User._id,
          },
          JWT_SECRET
        );

        res.status(200).json({ message: token });
      } catch (e) {
        res.status(404).json({ message: e });
      }
    }
  }
);

app.post("/api/v1/braino/content", userMiddleWare, async (req, res) => {
  const { title, type, link, content, tags } = req.body;
  const normalizedContent =
    type === "article" ? (content || link || "").trim() : content;
  const normalizedLink =
    type === "article" ? (link || content || "").trim() : link;

  await ContentModel.create({
    title,
    type,
    link: normalizedLink,
    content: normalizedContent,
    userId: new mongoose.Types.ObjectId(req.userId),
    tags,
  });

  res.status(200).json({ message: "Content added" });
});

app.get("/api/v1/braino/content", userMiddleWare, async (req, res) => {
  const userId = req.userId;

  const content = await ContentModel.find({
    userId: new mongoose.Types.ObjectId(userId),
  }).populate("userId", "username");

  res.status(200).json({ message: content });
});

app.delete("/api/v1/braino/delete/:contentId", userMiddleWare, async (req, res) => {
  const { contentId } = req.params;

  const deleted = await ContentModel.findOneAndDelete({
    _id: contentId,
    userId: new mongoose.Types.ObjectId(req.userId)
  });

  if(!deleted) {
    res.json({ message: "Not deleted content" });
  }

  res.json({ message: "Deleted content" })
})

app.post("/api/v1/braino/share", userMiddleWare, async (req, res) => {
  const share = req.body.share;

  if (share) {
    const existingLink = await LinkModel.findOne({
      userId: new mongoose.Types.ObjectId(req.userId),
    });

    if (existingLink) {
      res.json({
        hash: existingLink.hash,
      });
      return;
    }

    const hash = random(10);

    await LinkModel.create({
      userId: new mongoose.Types.ObjectId(req.userId),
      hash: hash,
    });

    res.json({ hash });
  } else {
    await LinkModel.deleteOne({
      userId: new mongoose.Types.ObjectId(req.userId),
    });

    res.json({ message: "Removed Link" });
  }
});

app.get("/api/v1/braino/share/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({ hash });

  if (!link) {
    res.status(411).json({ message: "Cannot find url" });
    return;
  }

  const content = await ContentModel.find({
    userId: link.userId,
  });

  const user = await UserModel.findOne({
    _id: link.userId,
  });

  if (!user) {
    res.status(404).json({ message: "User doesn't exists" });
    return;
  }

  res.status(200).json({
    username: user.username,
    content: content,
  });
});

app.listen(3000);
