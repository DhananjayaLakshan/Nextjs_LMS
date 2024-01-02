const express = require('express')
const dbConnect = require('./dbconnect')
const dotenv = require('dotenv').config()
const app = express()

dbConnect()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
})
