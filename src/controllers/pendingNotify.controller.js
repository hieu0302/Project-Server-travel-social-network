import { ObjectId } from "mongodb";
import { db } from "../../config/database.js";
import asyncHandler from "express-async-handler";

const createPendingNotify = asyncHandler(async (req, res) => {
  const newNotify = {
    ...req.body,
    createdAt: new Date(),
  };

  await db.pendingNotify.insertOne(newNotify);

  res.status(201).json({
    message: "Lưu thông báo thành công",
  });
});

const getNotifyByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await db.pendingNotify.find({ idReceiver: id }).toArray();
  console.log("data", data);
  res.json({
    data: data || [],
  });
});

const deletePendingNotify = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingNotify = await db.pendingNotify.findOne({
    idReceiver: id,
  });

  if (!existingNotify) {
    res.status(400);
    throw new Error("Không có thông báo chờ");
  }
  await db.pendingNotify.deleteMany({
    $or: [{ type: "like" }, { type: "comment" }],
    idReceiver: id,
  });
  res.json({ message: "Đã xoá thông báo" });
});

const deleteNotifyByIdRoomChat = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingNotify = await db.pendingNotify.findOne({ idRoomChat: id });

  if (!existingNotify) {
    res.status(400);
    throw new Error(" thông báo không tồn tại");
  }
  await db.pendingNotify.deleteMany({ idRoomChat: id });
  res.json({ message: "Đã xoá thông báo" });
});

const PendingNotifyController = {
  createPendingNotify,
  getNotifyByUserId,
  deletePendingNotify,
  deleteNotifyByIdRoomChat,
};

export default PendingNotifyController;
