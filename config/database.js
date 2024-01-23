import { MongoClient } from "mongodb";

const DATABASE = "trip-Social";

const db = {};

const connectToDatabase = async () => {
  try {
    const mongoClient = new MongoClient(process.env.MONGO_URI);
    await mongoClient.connect();

    console.log("Database connected");
    const database = mongoClient.db(DATABASE);

    db.posts = database.collection("posts");
    db.users = database.collection("users");
    db.images = database.collection("image");
    db.avatar = database.collection("avatar");
    db.comment = database.collection("comment");
    db.like = database.collection("like");
    db.album = database.collection("album");
    db.notify = database.collection("notify");
    db.pendingNotify = database.collection("pendingNotify");
    db.message = database.collection("message");
    db.chatRoom = database.collection("chatRoom");

  } catch (error) {
    console.error("Connect to DB failed: ", error);
    process.exit(1);
  }
};

export { connectToDatabase, db };
