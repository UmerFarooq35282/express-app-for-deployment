import "dotenv/config";
import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/" , (req,res) => {
    res.send("This is Home Page")
})

app.get('/about' , (req,res) => {
  res.send("This is about page")
})
app.listen(PORT, () => {
  console.log(`App is listening on PORT: ${PORT}`);
});
