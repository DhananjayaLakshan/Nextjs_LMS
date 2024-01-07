const express = require('express');
const dbConnect = require('./config/dbconnect');
const { notFound, handleError } = require('./middleware/errorHandler');
const userRouter = require('./routes/userRoute');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv').config();
const app = express();
// const { session } = require('passport');
// const passport = require('passport');
// const googleRouter = require('./routes/googleRoutes');
// const passportSetup = require('./utils/passport')


const PORT = process.env.PORT || 5000;
dbConnect();
// app.use(session({
//     resave: false,
//     saveUninitialized: false,
//     secret: "mysecret",
//     store: MongoStore.create({
//         mongoUrl: process.env.MONGODB_URI,
//         ttl: 12 * 60 * 60,
//     })
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// Body parsing middleware (included in Express 4.16.0+)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("/", (req,res) => {
//     res.send(`<a href='http://localhost:4000/google'>Login With Google</a>`)
// })

app.use("/api/user", userRouter);
// app.use("/", googleRouter)

app.use(notFound);
app.use(handleError);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
