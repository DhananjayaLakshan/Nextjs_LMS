const express = require('express');
const dbConnect = require('./config/dbconnect');
const { notFound, handleError } = require('./middleware/errorHandler');
const userRouter = require('./routes/userRoute');
const dotenv = require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 5000;
dbConnect();

// Body parsing middleware (included in Express 4.16.0+)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);

app.use(notFound);
app.use(handleError);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
