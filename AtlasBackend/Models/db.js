const mongoose = require("mongoose");
require('dotenv').config();

const mongoDBURL = process.env.MONGODB_URL ;

mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Connection Error: ", err));