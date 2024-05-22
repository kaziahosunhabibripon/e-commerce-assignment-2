import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    await mongoose.connect(config.db_uri as string);
    console.log("Database connected successfully !");

    app.listen(config.port, () => {
      console.log(
        `Server is connected on port http://localhost:${config.port}`
      );
    });
  } catch (err: any) {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  }
}

main();
