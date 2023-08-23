const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/user.js')
const dotenv = require('dotenv').config()
const cors = require('cors')

const PORT = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(express.json())
app.use(cors())
app.use('/api', userRouter)

// connection of mongodb database
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database is connected'))
    .catch(err => { console.log(err) })


app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
})