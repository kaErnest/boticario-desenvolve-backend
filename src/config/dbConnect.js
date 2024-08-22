import mongoose from "mongoose";

async function conectaNaDatabase() {
  if (process.env.NODE_ENV !== "test") {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
  }
  
  return mongoose.connection;
}

export default conectaNaDatabase;

