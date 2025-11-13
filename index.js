const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
app.use(cors());
app.use(express.json());

//pass: Uj7puBxkuh1C3Tal

const uri =
  "mongodb+srv://event-db:Uj7puBxkuh1C3Tal@cluster0.uxvhhti.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Ensures that the client will close when you finish/error
// await client.close();

app.get("/", (req, res) => {
  res.send("server is running fine");
});

app.get("/hello", (req, res) => {
  res.send("How are you");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
