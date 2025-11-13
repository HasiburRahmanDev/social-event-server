const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is running fine");
});

app.get("/hello", (req, res) => {
  res.send("How are you");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
