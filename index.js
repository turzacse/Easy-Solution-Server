const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//middleware 
app.use(cors());
app.use(express.json())


const uri = "mongodb+srv://to-do:CpIh6n78EFYPhp6T@cluster0.bnzewy6.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const todoCollection = client.db('task-management').collection('todo')
    const ongoingCollection = client.db('task-management').collection('ongoing')
    const completeCollection = client.db('task-management').collection('complete')

    app.get('/todo', async(req,res) => {
      const cursor = todoCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/todo', async(req,res) => {
      const newTodo = req.body;
      console.log(newTodo);
      const result = await todoCollection.insertOne(newTodo);
      res.send(result);
    }) 

    app.delete('/todo/:id', async (req,res) => {
      const id = req.params.id;
      console.log(id);
      const query = {_id : new ObjectId(id)}
      const result = await todoCollection.deleteOne(query);
      res.send(result);
    })

    app.get('/ongoing', async(req,res) => {
      const cursor = ongoingCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    app.post('/ongoing', async(req,res) => {
      const newOngoing = req.body;
      console.log(newOngoing);
      const result = await ongoingCollection.insertOne(newOngoing);
      res.send(result);
    }) 

  app.delete('/ongoing/:id', async (req,res) => {
    const id = req.params.id;
    console.log(id);
    const query = {_id : new ObjectId(id)}
    const result = await ongoingCollection.deleteOne(query);
    res.send(result);
  })

  app.get('/completed', async(req,res) => {
    const cursor = completeCollection.find();
    const result = await cursor.toArray();
    res.send(result);
  })
  
    app.post('/completed', async(req,res) => {
      const newComplete = req.body;
      console.log(newComplete);
      const result = await completeCollection.insertOne(newComplete);
      res.send(result);
    }) 
app.delete('/completed/:id', async (req,res) => {
  const id = req.params.id;
  console.log(id);
  const query = {_id : new ObjectId(id)}
  const result = await completeCollection.deleteOne(query);
  res.send(result);
})

    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);


app.get('/', (req,res) => {
    res.send ("Server Running")
})

app.listen (port, ()=> {
    console.log (`Running on port  ${port}`)
})