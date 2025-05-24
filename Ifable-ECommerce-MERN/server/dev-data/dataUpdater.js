const mongoose = require('mongoose');
const fs = require('fs');
const Product = require('../models/productModel');

const data = JSON.parse(fs.readFileSync(`${__dirname}/updatedData.json`, 'utf-8'));

// 1. Connect to MongoDB
const DB = 'mongodb+srv://dineshkumarbasuri8:kiQyJAG2kIlVykvA@cluster0.jmnecsd.mongodb.net/ifable?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your DB URI

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('DB connection successful');
  insertData();
})
.catch(err => {
  console.error('DB connection error:', err);
});

// 2. Insert data once connected
const insertData = async () => {
  try {
    await Product.insertMany(data);
    console.log('Data has been uploaded successfully');
    process.exit(); // Exit after successful insertion
  } catch (err) {
    console.error('Error inserting data:', err);
    process.exit(1); // Exit with failure code
  }
};
