import mongoose, { model, Schema } from "mongoose";
import { MONGO_URL } from "./config";

mongoose.connect(MONGO_URL);

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

export const UserModel = model("User", UserSchema);

const contentTypes = ["image", "twitter", "video", "link", "audio", "article", "youtube"]
const ContentSchema = new Schema({
    title: String,
    link: String,
    type: { type: String, enum: contentTypes, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String, ref: "Tags" }]
});

export const ContentModel = model("Content", ContentSchema);

const TagsSchema = new Schema({
    title: { type: String, required: true }
});

export const TagsModel = model("Tags", TagsSchema);

const LinkSchema = new Schema({
    hash: String,
    userId: { type: mongoose.Types.ObjectId, unique: true, ref: "User", required: true }
})

export const LinkModel = model("Link", LinkSchema);