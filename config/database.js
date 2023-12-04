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
  } catch (error) {
    console.error("Connect to DB failed: ", error);
    process.exit(1);
  }
};

export { connectToDatabase, db };
