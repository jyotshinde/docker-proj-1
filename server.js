const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/testdb";

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const ItemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model('Item', ItemSchema);

// Routes
app.get('/', (req, res) => {
  res.send('🚀 DevOps Practice App Running');
});

app.post('/add', async (req, res) => {
  const item = new Item({ name: req.body.name });
  await item.save();
  res.send(item);
});

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});