const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://10.200.200.3:27017,10.200.200.4:27017,10.200.200.5:27017/?replicaSet=rs0',
  )
  .then(() => console.log('MongoDB Connected to Replica Set'))
  .catch(err => console.log(err));


const Item = require('./models/Item');

app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});

const port = 3000;

app.listen(port, '0.0.0.0', () => console.log('Server running on port', port));
