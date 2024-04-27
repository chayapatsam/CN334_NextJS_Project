// database.js

const { MongoClient } = require('mongodb');

// Connection URI
const uri = "mongodb+srv://admin:0123456@leafyapp.b78yiqq.mongodb.net/leafy";

// Function to get product by ID
export async function getProductById(id) {
  // Create a new MongoClient
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    
    // Select the database and collection
    const database = client.db("leafy");
    const collection = database.collection("products");

    // Log the ID being used to query the database
    console.log("Querying product with ID:", id);


    // Find the product by ID
    const product = await collection.findOne({ id: id });

    // Log the retrieved product (for debugging purposes)
    console.log("Retrieved product:", product);

    return product;
    
  } catch (error) {
    // Log any errors that occur during the database operation
    console.error("Error retrieving product:", error);
    throw error; // Re-throw the error to be handled by the caller
  } finally {
    // Close the connection
    await client.close();
  }
}
