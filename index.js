const express = require('express');
const app = process.env.PORT || express();
const port = 5001;

// Database MongoDb
const { MongoClient, ServerApiVersion, ClientSession, ObjectId } = require('mongodb');

// Midleware
var cors = require('cors')
app.use(cors());
app.use(express.json());
//

const uri = "mongodb+srv://ridoy91221:xoqnp8w26WarMMag@cluster0.4mncda8.mongodb.net/?retryWrites=true&w=majority";

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
        await client.connect();
        const userCollection = client.db("Services").collection("Service");

        // POST user from Front end

        app.post('/user', async (req, res) => {
            const newUser = req.body; // Use req.body instead of res.body
            console.log(newUser);
            const result = await userCollection.insertOne(newUser);
            res.send({result:'success'}); // Access the insertedId property of the result
        });

        // Get Data from backend
        app.get('/user', async(req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const user = await cursor.toArray()
            res.send(user);
        })
        // Find a single user
        app.get('/user/:id' , async(req, res)=> {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const result =  await userCollection.findOne(query);
            res.send(result);
        })
        // User delete
        app.delete ('/user/:id', async(req, res)=> {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            res.send(result)

        })

    } finally {
        // await client.close();
    }
    // new user added form front end 

}
run().catch(console.dir);





// 
app.get('/', (req, res) => {

    res.send('Home page');
});
app.listen(port, () => {
    console.log('CRUD Server Running', port)
})