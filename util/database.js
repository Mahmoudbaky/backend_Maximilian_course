import { MongoClient } from "mongodb";

let _db;

export const mongoConnect = (cb) => {
  const uri =
    "mongodb+srv://ma7mouudbaky:hoda12345@nodejs.srb9q.mongodb.net/?retryWrites=true&w=majority&appName=NodeJS";

  MongoClient.connect(uri)
    .then((client) => {
      console.log("connecte!");
      _db = client.db();
      cb();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const getDb = () => {
  if (_db) {
    console.log(_db);
    return _db;
  }
  throw "No database found!";
};
