import { ObjectId } from "mongodb";
import { db } from "../../config/database.js";
import asyncHandler from "express-async-handler";

const getAllPost = asyncHandler(async (req, res) => {
  const totalPost = await db.posts.find().sort({ createAt: -1 }).toArray();

  res.json({ data: totalPost });
});

const createPost = asyncHandler(async (req, res) => {
  const newPost = {
    ...req.body,
    createAt: new Date(),
  };

  await db.posts.insertOne(newPost);

  res.status(201).json({
    message: "Created successfully",
  });
});

const deleteByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingPost = await db.posts.findOne({ _id: new ObjectId(id) });

  if (!existingPost) {
    res.status(400);
    throw new Error("Bài viết không tồn tại");
  }
  await db.posts.deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Đã xoá bài viết" });
});
const PostsController = {
  getAllPost,
  createPost,
  deleteByID,
};

export default PostsController;
