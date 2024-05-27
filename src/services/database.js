const mongoose = require("mongoose");
require('dotenv').config();

const uri = process.env.MONGO_URI;

if (!uri) {
    console.error('MONGO_URI is not defined in the environment variables');
    process.exit(1);
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB successfully');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});
