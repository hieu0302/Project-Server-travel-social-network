import { ObjectId } from "mongodb";
import { db } from "../../config/database.js";
import asyncHandler from "express-async-handler";

const getAllPost = asyncHandler(async (req, res) => {
  const totalPost = await db.posts.find().sort({ createAt: -1 }).toArray();

  res.json({ data: totalPost });
});

const getPostByUserId = asyncHandler(async (req, res) => {
  const userId = req.user.id; // Lấy userId từ request parameters

  // Sử dụng userId để tìm các bài đăng của người dùng đó
  const userPosts = await db.posts.find({ userId: userId }).sort({ createAt: -1 }).toArray();

  res.json({ data: userPosts });
});

const createPost = asyncHandler(async (req, res) => {
  const newPost = {
    ...req.body,
    createAt: new Date(),

  };

  await db.posts.insertOne(newPost);

  res.status(201).json({
    message: "Created successfully",
  });
});


const getSavedPosts = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await db.users.findOne({_id: new ObjectId(userId)})
    // Truy vấn cơ sở dữ liệu để lấy danh sách các bài viết đã lưu của userId cụ thể
    const savedPosts = await db.posts.find({_id: {$in: user?.savePost?.map(item => new ObjectId(item))}}).sort({ createAt: -1 }).toArray();;
    console.log(savedPosts)
    res.json(savedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const putSavedPosts = asyncHandler(async (req, res) => {
  try {
    const user = req.user?.id
    const _id = req.params.id; // Thay thế postId thành _id

    const getUserSavedPost = await db.users.findOne({ _id: new ObjectId(user) })
    let savedPost = []


    const checkExistSavedPost = getUserSavedPost?.savePost?.find(item => item == _id)
    if (!getUserSavedPost?.savePost) {
      savedPost = [_id]
    }
    else if (!checkExistSavedPost) {
      savedPost = [...getUserSavedPost.savePost, _id]
    } else {
      savedPost = getUserSavedPost.savePost?.filter(item => item != _id)
    }

    await db.users.updateOne({ _id: new ObjectId(user) }, { $set: { savePost: savedPost } })

    return res.status(200).json({ postId: _id })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
}
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

const PostsController = {
  deleteByID,
  getAllPost,
  getPostByUserId,
  createPost,
  getSavedPosts,
  getPaging,
  putSavedPosts,
}

export default PostsController;
