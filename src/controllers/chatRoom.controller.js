import { ObjectId } from "mongodb";
import { db } from "../../config/database.js";
import asyncHandler from "express-async-handler";

const createChatRoom = asyncHandler(async (req, res) => {
  const newData = {
    ...req.body,
    createdAt: new Date(),
  };

  const result = await db.chatRoom.insertOne(newData);
  const newChatRoomId = result.insertedId;
  const newChatRoomData = await db.chatRoom.findOne({ _id: newChatRoomId });

  res.status(201).json({
    message: "Tạo phòng chat thành công",
    newChatRoomData,
  });
});

const getChatRoom = asyncHandler(async (req, res) => {
  const idUser = req.query.idUser;
  const sort = req.query.sort || "desc";
  const sortValue = sort === "desc" ? -1 : 1;

  const chatRoom = await db.chatRoom
    .find({ "member.memberId": idUser })
    .sort({ createdAt: sortValue })
    .toArray();

  res.json({
    chatRoom,
  });
});

const deleteChatRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingChatRoom = await db.chatRoom.findOne({ _id: new ObjectId(id) });

  if (!existingChatRoom) {
    res.status(400);
    throw new Error("Phòng chat không tồn tại");
  }
  await db.chatRoom.deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Đã xoá phòng chat" });
});

const ChatRoomController = {
  createChatRoom,
  getChatRoom,
  deleteChatRoom,
};

export default ChatRoomController;
