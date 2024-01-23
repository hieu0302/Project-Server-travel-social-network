import { ObjectId } from "mongodb";
import { db } from "../../config/database.js";
import asyncHandler from "express-async-handler";

const createComment = asyncHandler(async (req, res) => {
  const newComment = {
    ...req.body,
    createdAt: new Date(),
  };
  const result = await db.comment.insertOne(newComment);
  const commentId = result.insertedId;
  const comment = await db.comment.findOne({ _id: commentId });
  res.status(201).json({
    comment,
    message: "Created successfully",
  });
});

const getCommentByIdPost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingComment = await db.comment
    .find({
      idPost: id,
    })
    .toArray();

  if (!existingComment) {
    return res.json({
      message: "Comment not found",
    });
  }

  res.json(existingComment);
});

const getCommentByID = asyncHandler(async (req, res) => {
  const { id } = req.query;

  const existingComment = await db.comment.findOne({ _id: new ObjectId(id) });

  if (!existingComment) {
    res.status(400);
    throw new Error("Bình luận không tồn tại!");
  }
  res.json(existingComment);
});

const deleteCmtByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingComment = await db.comment.findOne({ _id: new ObjectId(id) });

  if (!existingComment) {
    res.status(400);
    throw new Error("Bài viết không tồn tại");
  }
  await db.comment.deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Đã xoá bài viết" });
});
// const limit = parseInt(req.query.page) || 3;
// const comment = await db.comment.find().toArray();
const getCommentByPage = asyncHandler(async (req, res) => {
  const idPost = req.query.idPost;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sort = req.query.sort || "desc";
  const skip = (page - 1) * limit;
  const sortValue = sort === "desc" ? -1 : 1;

  const comments = await db.comment
    .find({ idPost: idPost })
    .sort({ createdAt: sortValue })
    .skip(skip)
    .limit(limit)
    .toArray();

  const totalComment = await db.comment.find({ idPost: idPost }).count();
  const totalPages = Math.ceil(totalComment / limit);
  res.json({
    data: comments || [],
    pagination: {
      totalItem: totalComment,
      limit,
      currentPage: page,
      totalPages,
      totalComment,
    },
  });
});

const CommentController = {
  createComment,
  getCommentByIdPost,
  getCommentByID,
  deleteCmtByID,
  getCommentByPage,
};

export default CommentController;
