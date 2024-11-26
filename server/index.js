const express = require('express');
const connectDB = require('./database/db');
const userRoute = require('./routes/userRoute');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : [process.env.FRONTEND_URL],
    credentials : true,
}));
app.use('/api/v1/user', userRoute);

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})