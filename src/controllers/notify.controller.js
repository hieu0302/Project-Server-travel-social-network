import { ObjectId } from "mongodb";
import { db } from "../../config/database.js";
import asyncHandler from "express-async-handler";

const createNotify = asyncHandler(async (req, res) => {
  const newNotify = {
    ...req.body,
    createdAt: new Date(),
  };

  const result = await db.notify.insertOne(newNotify);
  const newNotifyId = result.insertedId;
  const newnotifyData = await db.notify.findOne({ _id: newNotifyId });

  res.status(201).json({
    message: "Lưu thông báo thành công",
    newnotifyData,
  });
});

const getNotify = asyncHandler(async (req, res) => {
  const idUser = req.query.idUser;
  const sort = req.query.sort || "desc";
  const sortValue = sort === "desc" ? -1 : 1;

  const notifys = await db.notify
    .find({ idUser: idUser })
    .sort({ createdAt: sortValue })
    .toArray();

  res.json({
    data: notifys || [],
  });
});

const deleteNotify = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingNotify = await db.notify.findOne({ _id: new ObjectId(id) });

  if (!existingNotify) {
    res.status(400);
    throw new Error("bài viết không tồn tại");
  }
  await db.notify.deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Đã xoá thông báo" });
});

const NotifyController = {
  createNotify,
  getNotify,
  deleteNotify,
};

export default NotifyController;
