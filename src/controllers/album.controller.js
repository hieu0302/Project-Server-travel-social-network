import { ObjectId } from "mongodb";
import { db } from "../../config/database.js";
import asyncHandler from "express-async-handler";

const createAlbum = asyncHandler(async (req, res) => {
  const newAlbum = {
    ...req.body,
    createdAt: new Date(),
  };

  await db.album.insertOne(newAlbum);

  res.status(201).json({
    message: "Tạo album ảnh thành công",
  });
});

const getAllAlbum = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const sort = req.query.sort || "desc";
  const skip = (page - 1) * limit;
  const sortValue = sort === "desc" ? -1 : 1;

  const album = await db.album
    .find()
    .sort({
      createdAt: sortValue,
    })
    .skip(skip)
    .limit(limit)
    .toArray();

  const totalAlbum = await db.album.countDocuments();
  const totalPages = Math.ceil(totalAlbum / limit);

  res.json({
    data: album || [],
    pagination: {
      totalItem: totalAlbum,
      limit,
      currentPage: page,
      totalPages,
    },
  });
});

const deleteByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingPost = await db.album.findOne({ _id: new ObjectId(id) });

  if (!existingPost) {
    res.status(400);
    throw new Error("Bài viết không tồn tại");
  }
  await db.album.deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Đã xoá bài viết" });
});

const AlbumController = {
  getAllAlbum,
  createAlbum,
  deleteByID,
};

export default AlbumController;
