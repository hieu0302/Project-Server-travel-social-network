import { ObjectId } from "mongodb";
import { db } from "../../config/database.js";
import asyncHandler from "express-async-handler";

const getAllPost = asyncHandler(async (req, res) => {
  const totalPost = await db.posts.find().toArray();
  res.json({ data: totalPost });
});

const createPost = asyncHandler(async (req, res) => {
  const newPost = {
    ...req.body,
    createAt: new Date(),
  };
  console.log("OK");
  await db.posts.insertOne(newPost);

  res.status(201).json({
    message: "Created successfully",
  });
});

const PostsController = {
  getAllPost,
  createPost,
};

export default PostsController;
