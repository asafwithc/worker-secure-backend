const mongoose = require("mongoose");

// Replace the uri string with your connection string.
const uri = process.env.MONGO_URI;



mongoose.connect(uri).catch((err) => console.log(err));