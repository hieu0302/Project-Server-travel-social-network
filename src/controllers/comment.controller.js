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
  console.log(existingComment);

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

const CommentController = {
  createComment,
  getCommentByIdPost,
  getCommentByID,
  deleteCmtByID,
};

export default CommentController;
