import mongoose from "mongoose";

export const monogConnect = (cb) => {
  const uri =
    "mongodb+srv://ma7mouudbaky:hoda12345@nodejs.srb9q.mongodb.net/?retryWrites=true&w=majority&appName=NodeJS";

  mongoose
    .connect(uri)
    .then((client) => {
      console.log("connecte!");
      cb(client);
    })
    .catch((err) => console.log(err));
};
