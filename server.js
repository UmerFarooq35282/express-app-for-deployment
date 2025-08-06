import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./db/connectDB.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is listening on PORT: ${PORT}`);
  connectDB();
});
