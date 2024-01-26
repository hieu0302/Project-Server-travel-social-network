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
const getPostByUserId = asyncHandler(async (req, res) => {
  const userId = req.user.id; // Lấy userId từ request parameters

  // Sử dụng userId để tìm các bài đăng của người dùng đó
  const userPosts = await db.posts.find({ userId: userId }).sort({ createAt: -1 }).toArray();

  res.json({ data: userPosts });
});
const getPaging = async (req, res) => {
  try {
    const pageSize = req.query.pageSize
    const pageIndex = req.query.pageIndex

    const result = await db.posts.find().skip(pageSize * pageIndex - pageSize).limit(pageSize)

    return res.status(200).json({ result })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
};
const PostsController = {
  getAllPost,
  createPost,
  deleteByID,
  getPostByUserId,
  getPaging,
};

export default PostsController;
