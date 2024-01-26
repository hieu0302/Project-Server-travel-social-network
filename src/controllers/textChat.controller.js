import { ObjectId } from "mongodb";
import { db } from "../../config/database.js";
import asyncHandler from "express-async-handler";

const createMessage = asyncHandler(async (req, res) => {
  const newData = {
    ...req.body,
    createdAt: new Date(),
  };

  const result = await db.message.insertOne(newData);
  const newMessageId = result.insertedId;
  const newMessageData = await db.message.findOne({ _id: newMessageId });

  res.status(201).json({
    message: "Gửi tin nhắn thành công",
    newMessageData,
  });
});

const getMessage = asyncHandler(async (req, res) => {
  const idRoomChat = req.query.idRoomChat;
  const sort = req.query.sort || "desc";
  const sortValue = sort === "desc" ? -1 : 1;

  const messageData = await db.message
    .find({ idRoomChat: idRoomChat })
    .sort({ createdAt: sortValue })
    .toArray();

  res.json({
    data: messageData || [],
  });
});

const deleteMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingMessage = await db.message.findOne({ _id: new ObjectId(id) });

  if (!existingMessage) {
    res.status(400);
    throw new Error("Tin nhắn không tồn tại");
  }
  await db.message.deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Đã xoá tin nhắn" });
});

const MessageController = {
  createMessage,
  getMessage,
  deleteMessage,
};

export default MessageController;
