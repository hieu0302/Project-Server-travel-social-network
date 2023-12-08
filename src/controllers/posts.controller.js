import { ObjectId } from "mongodb";
import { db } from "../../config/database.js";
import asyncHandler from "express-async-handler";

const getAllPost = asyncHandler(async (req, res) => {
  const totalPost = await db.posts.find().toArray();
  res.json({ data: totalPost });
}); 

const createPost = asyncHandler(async (req, res) => {
  const newPost = {
    ...req.body,
    createAt: new Date(),
    status: 'published',
  };
  console.log("OK");
  await db.posts.insertOne(newPost);

  res.status(201).json({
    message: "Created successfully",
  });
});
const getPublishedPosts = asyncHandler(async (req, res) => {
  const publishedPosts = await db.posts.find({ published: true }).toArray();
  res.json({ data: publishedPosts });
});

const getSavedPosts = asyncHandler(async (req, res) => {
  const savedPosts = await db.posts.find({ saved: true }).toArray();
  res.json({ data: savedPosts });
});

const getPaging = async (req, res) => {
  try {
    const pageSize = req.query.pageSize 
    const pageIndex = req.query.pageIndex

    const result = await db.posts.find().skip(pageSize * pageIndex - pageSize).limit(pageSize)

    return res.status(200).json({result})
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
const PostsController = {
  getAllPost,
  createPost,
  getPublishedPosts,
  getSavedPosts,
  getPaging
};

export default PostsController;
