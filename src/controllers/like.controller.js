import { ObjectId } from "mongodb";
import { db } from "../../config/database.js";
import asyncHandler from "express-async-handler";

const getAllLike = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingLike = await db.like.find({ idPost: id }).toArray();

  const totalLikeByPost = await db.like.countDocuments({ idPost: id });

  if (!existingLike) {
    return res.json({
      message: "Chưa thích bài viết này",
    });
  }

  res.json({
    data: existingLike || [],
    totalLike: totalLikeByPost,
  });
});

const getCountLike = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const totalLikeByPost = await db.like.countDocuments({ idPost: id });

  return res.json({
    data: totalLikeByPost || [],
    idPost: id,
  });
});

const getAllPostLiked = asyncHandler(async (req, res) => {
  const idPost = req.query.idPost;
  const idUser = req.query.idUser;

  const result = await db.like
    .find({ $and: [{ idUser: idUser }, { idPost: idPost }] })
    .toArray();

  return res.json({
    data: result || [],
  });
});

const createLike = asyncHandler(async (req, res) => {
  const newLike = {
    ...req.body,
    createdAt: new Date(),
  };
  const existingLike = await db.like.findOne({
    idPost: newLike.idPost,
    idUser: newLike.idUser,
  });

  if (existingLike) {
    res.status(400).json({
      message: "Đã tồn tại User",
    });
  } else {
    const result = await db.like.insertOne(newLike);
    const newLikeId = result.insertedId;
    const newLikeData = await db.like.findOne({ _id: newLikeId });

    res.status(201).json({
      newLikeData,
      message: "Đã thích bài viết",
    });
  }
});

const deleteLikeByID = asyncHandler(async (req, res) => {
  const idPost = req.query.idPost;
  const idUser = req.query.idUser;

  const existingID = await db.like.findOne({
    $and: [{ idUser: idUser }, { idPost: idPost }],
  });

  if (!existingID) {
    res.status(400);
    throw new Error("Chưa thích bài viết này");
  }
  await db.like.deleteOne({ _id: existingID._id });
  res.json({ message: "Đã bỏ thích bài viết" });
});

const LikesController = {
  getAllLike,
  createLike,
  deleteLikeByID,
  getCountLike,
  getAllPostLiked,
};

export default LikesController;
