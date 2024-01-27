import mongoose from "mongoose";

export const connectionDb = async () => {
  var connection = false;

  await mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
      connection = true;
      console.log("successfully database connection ⭐");
    })
    .catch((err) => console.log("err:", err));
  return connection;
};

