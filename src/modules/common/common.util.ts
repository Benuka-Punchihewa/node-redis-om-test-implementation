import mongoose from "mongoose";

const connectDB = async (url: string) => {
  return mongoose
    .connect(url, { retryWrites: true, w: "majority" })
    .then(() => {
      console.log("MONGO DB CONNECTION SUCCESSFUL!");
    })
    .catch((err) => {
      console.error(err);
    });
};

export default { connectDB };
