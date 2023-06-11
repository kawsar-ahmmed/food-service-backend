const express = require('express')
const app = process.env.PORT || express()
const port = 5001;
// Database MongoDb
const { MongoClient, ServerApiVersion } = require('mongodb');

// Midleware
var cors = require('cors')
app.use(cors());
app.use(express.json());
//

const uri = "mongodb+srv://ridoy91221:GfQczLDeaODS8iSd@cluster-new.jt669nt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
// 
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

// 
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log('Listening', port)
})