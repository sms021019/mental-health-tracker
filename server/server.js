const express = require('express');
const app = express();
// const noteRoutes = require('./routes/note');
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');

dotenv.config();

MONGO_CONNECTION = "mongodb+srv://hack2024hack:JXnWR6anHU9VtfDh@cluster0.52s2mua.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGO_CONNECTION, {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/api', userRoutes);

app.use(cors(
    {
        origin: ["http://localhost:3001/"],
        methods: ["POST", "GET", "PUT"],
        credentials: true
    }
))

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server Port: ${PORT}`));