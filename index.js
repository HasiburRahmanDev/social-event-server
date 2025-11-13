const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
app.use(cors());
app.use(express.json());

//pass: Uj7puBxkuh1C3Tal

const uri =
  "mongodb+srv://event-db:Uj7puBxkuh1C3Tal@cluster0.uxvhhti.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const db = client.db("event-db");
    const eventCollection = db.collection("events");

    app.get("/events", async (req, res) => {
      const result = await eventCollection.find().toArray();
      res.send(result);
    });

    app.get("/events/:id", async (req, res) => {
      const { id } = req.params;
      console.log(id);
      const objectId = new ObjectId(id);
      const result = await eventCollection.findOne({ _id: objectId });

      res.send({
        success: true,
        result,
      });
    });

    app.post("/events", async (req, res) => {
      const data = req.body;

      console.log(data);
      const result = await eventCollection.insertOne(data);
      res.send({
        success: true,
        result,
      });
    });

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
