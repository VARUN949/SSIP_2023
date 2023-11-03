const { MongoClient } = require("mongodb");

// MongoDB Atlas connection string
const uri = "mongodb+srv://bavadiyadhruv:cf8YtIjKGoBNXPaA@cluster1.zvsodkn.mongodb.net/";
// const uri = "mongodb+srv://bavadiyadhruv:cf8YtIjKGoBNXPaA@cluster1.mongodb.net/SSIP2023?retryWrites=true&w=majority";

async function createIndex() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
  
      const database = client.db("SSIP2023");
      const collection = database.collection("places");
  
      // Get list of indexes
      const indexes = await collection.indexes();
  
      // Log the indexes
      console.log(indexes);
    } finally {
      await client.close();
    }
  
}

createIndex().catch(console.error);
