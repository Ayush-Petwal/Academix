const express = require('express');
const connectDB = require('./database/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
connectDB();