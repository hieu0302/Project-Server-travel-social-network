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
const update = asyncHandler(async (req, res) => {
  let postID = req.params.id;
  const { title, content, image, location, startDay, endDay } = req.body;

  const post = await db.posts.findOne({ _id: new ObjectId(postID) });
  if (!post) {
    return res.status(400).send("Không có bài viết này");
  } else {
    console.log(req.body);
    const update = await db.posts.updateOne(
      { _id: new ObjectId(postID) },
      { $set: { title, content, image, location, startDay, endDay } }
    );
    console.log(update);
    if (update.modifiedCount > 0) {
      res.json({ message: "Cập nhật thành công!" });
    } else {
      res.status(500).send("Lỗi cập nhật!");
    }
  }
});

const PostsController = {
  getAllPost,
  createPost,
  deleteByID,
  update,
};

export default PostsController;
