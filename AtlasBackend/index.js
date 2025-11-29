const express = require('express');
require('dotenv').config();
require('./Models/db');

const app = express();
const PORT = process.env.PORT || 3000;
const AuthRouter = require('./Routes/AuthRouter');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', AuthRouter);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});