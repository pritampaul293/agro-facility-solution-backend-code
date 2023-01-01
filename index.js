const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const ObjectId = require("mongodb").ObjectId;

// Creating express app
const app = express();

// Connect to mongodb
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://db_user_pritam:${process.env.DB_PASS}@cluster0.xrzq7vz.mongodb.net/?retryWrites=true&w=majority`;

// routes
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// Creating middlewares
app.use(cors());
app.use(express.json());

// CONNETIN TO  DB AND CREATING REST APIS
async function run() {
  try {
    await client.connect();
    console.log("db is connected");
    const database = client.db("AdhunikKrishiKhamar");
    // Create collections
    const userCollection = database.collection("User-collection");
    const agroCommunityCollection = database.collection("Agro-community");
    const recentNewsColletion = database.collection("All-recent-news");
    const otherNewsCollection = database.collection("Other-news-collection");
    const goveshonaTipsCollection = database.collection("Goveshona-tips");
    const krishitTipsCollection = database.collection("All-krishi-tips");
    const motamotCollection = database.collection("All-motamot");
    const reviewCollection = database.collection("All-Reviews");
    const farmToProkritiCollection = database.collection("Farm-to-Prokriti");
    const contactCollection = database.collection("All-Contacts");
    const firmToDiningCollection = database.collection("All-firm-to-dining");
    const goveshonaProjuktiCollection = database.collection(
      "All-govashona-projukti"
    );
    const krishiOrthonitiCollection = database.collection("Krishi-Orthoniti");
    const poltryDairyCollection = database.collection("Poltry-Dairy");

    const digitalTechnologiesCollection = database.collection(
      "Digital-technologies"
    );
    const ordersCollection = database.collection("All-Order");

    // RES-APIS

    // post api for saving user info
    app.post("/users", async (req, res) => {
      const userInfo = req.body;
      const result = await userCollection.insertOne(userInfo);
      res.json(result);
    });

    // get api for loading single user detials based on email
    // get api for loading user products
    app.get("/users/:email", async (req, res) => {
      // const query = { userEmail: req.params.email };
      const result = await userCollection
        .find({ email: req.params.email })
        .toArray();
      res.send(result);
    });

    // get request for  getting agro-gibs  from sever
    app.get("/agroCommunity/all", async (req, res) => {
      const result = await agroCommunityCollection.find({}).toArray();
      res.json(result);
    });

    // get  api for loading single agro gib  information
    app.get("/agroCommunity/:id", async (req, res) => {
      const agroId = req.params.id;
      const query = { _id: ObjectId(agroId) };
      const result = await agroCommunityCollection.findOne(query);
      res.json(result);
    });

    // get api for loading all  new nes
    app.get("/recentNews", async (req, res) => {
      const result = await recentNewsColletion.find({}).toArray();
      res.json(result);
    });

    // get api for loading single  new  news details
    app.get("/recentNews/:id", async (req, res) => {
      const newsId = req.params.id;
      const query = { _id: ObjectId(newsId) };
      const result = await recentNewsColletion.findOne(query);
      res.json(result);
    });

    // get  api for  loading other news
    app.get("/otherNews", async (req, res) => {
      const result = await otherNewsCollection.find({}).toArray();
      res.json(result);
    });

    // get api for loading single other news information
    app.get("/otherNews/:id", async (req, res) => {
      const newsId = req.params.id;
      const query = { _id: ObjectId(newsId) };
      const result = await otherNewsCollection.findOne(query);
      res.json(result);
    });

    // get  api for  laoding all  goveshona  tips
    app.get("/goveshonaTips", async (req, res) => {
      const result = await goveshonaTipsCollection.find({}).toArray();
      res.json(result);
    });

    // get api for loading single goveshona tips
    app.get("/goveshonaTips/:id", async (req, res) => {
      const tipsId = req.params.id;
      const query = { _id: ObjectId(tipsId) };
      const result = await otherNewsCollection.findOne(query);
      res.json(result);
    });

    // get  api for loading all farm to prokriti
    app.get("/farmToPakhriti", async (req, res) => {
      const result = await farmToProkritiCollection.find({}).toArray();
      res.json(result);
    });

    // get api for loading single farom  to prokriti details
    app.get("/goveshonaTips/:id", async (req, res) => {
      const farmId = req.params.id;
      const query = { _id: ObjectId(farmId) };
      const result = await farmToProkritiCollection.findOne(query);
      res.json(result);
    });

    // get api for showing  6  digital  technologies (ECOM)
    // get request cycles from home
    app.get("/digitalTechnologies", async (req, res) => {
      const result = await digitalTechnologiesCollection
        .find({})
        .limit(7)
        .toArray();
      res.json(result);
    });

    // get api for loading all digital technologies (ECOM)
    app.get("/digitalTechnologies/all", async (req, res) => {
      const result = await digitalTechnologiesCollection.find({}).toArray();
      res.json(result);
    });

    // get  api for loadin  single digital technology details
    app.get("/digitalTechnologies/:id", async (req, res) => {
      const techId = req.params.id;
      // console.log(`Hitted the server ${techId}`);
      const query = { _id: ObjectId(techId) };
      const result = await digitalTechnologiesCollection.findOne(query);
      res.json(result);
    });

    // delete api  for admin to delete  a single  digital  technology
    app.delete("/digitalTechnologies/:id", async (req, res) => {
      const techId = req.params.id;

      const query = { _id: ObjectId(techId) };
      const result = await digitalTechnologiesCollection.deleteOne(query);
      res.json(result);
    });

    // post api for  admin to create a digital technology
    app.post("/addTechnology", async (req, res) => {
      const newTech = req.body;
      const result = await digitalTechnologiesCollection.insertOne(newTech);
      res.json(result);
    });

    // post api for adding user reviews to database
    app.post("/reviews", async (req, res) => {
      const newReview = req.body;
      const result = await reviewCollection.insertOne(newReview);
      res.json(result);
    });

    // post api for adding user reviews to database
    app.post("/contacts", async (req, res) => {
      const newContactInfo = req.body;
      const result = await contactCollection.insertOne(newContactInfo);
      res.json(result);
    });

    // delete api for admin to delete  a digital technology
    app.delete("/technologies/delete/:id", async (req, res) => {
      const techId = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await digitalTechnologiesCollection.deleteOne(query);
      res.json(result);
    });

    // post api for adding a cylcle by admin
    app.post("/addProduct", async (req, res) => {
      const newTin = req.body;
      const result = await digitalTechnologiesCollection.insertOne(newTin);
      res.json(result);
    });

    // get api for loading all motamot
    app.get("/motamot/all", async (req, res) => {
      const result = await motamotCollection.find({}).toArray();
      res.json(result);
    });

    // get api for loading single motamot details
    app.get("/motamot/:id", async (req, res) => {
      const motamotId = req.params.id;
      const query = { _id: ObjectId(motamotId) };
      const result = await motamotCollection.findOne(query);
      res.json(result);
    });
    // get api for loading all krishi tips
    app.get("/krishiTips/all", async (req, res) => {
      const result = await krishitTipsCollection.find({}).toArray();
      res.json(result);
    });

    // get api for loading single krishi tips details
    app.get("/krishiTips/:id", async (req, res) => {
      const tipId = req.params.id;
      const query = { _id: ObjectId(tipId) };
      const result = await krishitTipsCollection.findOne(query);
      res.json(result);
    });

    // get api for loading all farm to dinining
    app.get("/firmToDining/all", async (req, res) => {
      const result = await firmToDiningCollection.find({}).toArray();
      res.json(result);
    });

    // get api for loading single krishi tips details
    app.get("/firmToDining/:id", async (req, res) => {
      const firmId = req.params.id;
      const query = { _id: ObjectId(firmId) };
      const result = await firmToDiningCollection.findOne(query);
      res.json(result);
    });

    // get api for loading all krishi govashona and projukti
    app.get("/govashonaProjukti/all", async (req, res) => {
      const result = await goveshonaProjuktiCollection.find({}).toArray();
      res.json(result);
    });

    // get api for loading single govashona projukti details
    app.get("/govashonaProjukti/:id", async (req, res) => {
      const govashonaId = req.params.id;
      const query = { _id: ObjectId(govashonaId) };
      const result = await goveshonaProjuktiCollection.findOne(query);
      res.json(result);
    });

    // get api for loading krishi orthoniti
    app.get("/krishiOrthonit/all", async (req, res) => {
      const result = await krishiOrthonitiCollection.find({}).toArray();
      res.json(result);
    });

    // get api for loading single krishi orthoniti details
    app.get("/krishiOrthoniti/:id", async (req, res) => {
      const orthonitiId = req.params.id;
      const query = { _id: ObjectId(orthonitiId) };
      const result = await krishiOrthonitiCollection.findOne(query);
      res.json(result);
    });

    // get api for loading all poltry and dairies
    app.get("/poltryDairy/all", async (req, res) => {
      const result = await poltryDairyCollection.find({}).toArray();
      res.json(result);
    });

    // get api for loading single krishi orthoniti details
    app.get("/poltryDairy/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await poltryDairyCollection.findOne(query);
      res.json(result);
    });

    // ADMIN FUNCTIONALITIES

    // put request giving admin role to an existing user
    app.put("/users", async (req, res) => {
      console.log("hitter server to make admin");
      const email = req.body.email;
      const filter = { email: email };
      const updateDoc = {
        $set: { role: "admin" },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.json(result);
    });

    /// E-COMMERCE ORDER FUNCTIONALITIES

    // create new order by user, 
    app.post("/newOrder", async (req,res)=>{
      const newOrderInfo = req.body;
      const result = await ordersCollection.insertOne(newOrderInfo)
      res.json(result);
    })

  } finally {
    // await client.close()
  }
}
run().catch(console.dir());
app.get("/", (req, res) => {
  res.send(`Server is  running on port ${port}`);
});

// Listening the app  on port -5000
app.listen(port, () => {
  console.log(`Listening  the app  on port ${port}`);
});
