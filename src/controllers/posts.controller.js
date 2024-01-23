import { ObjectId } from "mongodb";
import { db } from "../../config/database.js";
import asyncHandler from "express-async-handler";

const getAllPost = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const sort = req.query.sort || "desc";

  const skip = (page - 1) * limit;
  const sortValue = sort === "desc" ? -1 : 1;

  const posts = await db.posts
    .find()
    .sort({
      createdAt: sortValue,
    })
    .skip(skip)
    .limit(limit)
    .toArray();

  const totalPost = await db.posts.countDocuments();
  const totalPages = Math.ceil(totalPost / limit);

  res.json({
    data: posts || [],
    pagination: {
      totalItem: totalPost,
      limit,
      currentPage: page,
      totalPages,
    },
  });
});

const createPost = asyncHandler(async (req, res) => {
  const newPost = {
    ...req.body,
    createdAt: new Date(),
  };

  const result = await db.posts.insertOne(newPost);
  const newPostId = result.insertedId;
  const newPostData = await db.posts.findOne({ _id: newPostId });

  res.status(201).json({
    message: "Created successfully",
    newPostData,
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
  const { id } = req.params;

  const existingPost = await db.posts.findOne({ _id: new ObjectId(id) });

  if (!existingPost) {
    res.status(400);
    throw new Error("Post not found");
  }

  const { _id, ...rest } = req.body;

  const updateData = {
    ...existingPost,
    ...rest,
    updatedAt: new Date(),
  };
  await db.posts.updateOne({ _id: new ObjectId(id) }, { $set: updateData });

  res.json({ message: "Cập nhật thành công" });
});

const PostsController = {
  getAllPost,
  createPost,
  deleteByID,
  update,
};

export default PostsController;
