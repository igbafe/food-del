import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose
    .connect(
      "mongodb+srv://igbafes8:qSXEJqcEvr6FLEa8@cluster0.dyf2pzs.mongodb.net/food-del=Cluster0"
    )
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err));
};
