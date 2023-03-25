const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Mobile Masters server is Running");
});
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://FreelyTalk:9S5eCRPOrB2yKAdW@cluster0.k9jkjo0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

try {
  const addService = client.db("FreelyTalk").collection("OtherProjectData");
  app.post("/addService", async (req, res) => {
    const info = req.body;
    const addServices = await addService.insertOne(info);
    res.send(addServices);
  });

  app.get("/allMobileService", async (req, res) => {
    const query = {};
    const cursor = await addService.find(query).toArray();
    res.send(cursor);
  });
} catch {}

app.listen(port, () => {
  console.log(`FreeTalk Server is Running on ${port} `);
});
