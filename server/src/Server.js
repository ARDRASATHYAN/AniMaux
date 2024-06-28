require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');


const registerRouter = require('./routers/registerRouter');
const loginRouter = require('./routers/loginRouter');
const serviceRouter = require('./routers/serviceRouter');
const imageRouter = require('./routers/imageRouter');
const daliydocterRouter = require('./routers/daliydoctorRouter');
const appointmentRouter = require('./routers/appointmentRouter');
const userRouter = require('./routers/userRouter');
const petRouter = require('./routers/petRouter');
const priscriptionRouter = require('./routers/priscriptionRouter');
const vaccinationRouter = require('./routers/vaccinationRouter');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use('/register',registerRouter);
app.use('/login',loginRouter);
app.use('/service',serviceRouter);
app.use('/image',imageRouter);
app.use('/docteravaliable',daliydocterRouter);
app.use('/appoint',appointmentRouter);
app.use('/user',userRouter);
app.use('/pet',petRouter);
app.use('/prescription',priscriptionRouter);
app.use('/vaccine',vaccinationRouter);


app.get("/", (req, res) => {
    res.send("<h1>Hello world...</h1>");
  });

const mongoDBurl = process.env.MONGO_URI;

mongoose.connect(mongoDBurl)
    .then(() => {
        app.listen(4000, () => {
            console.log("Server started at http://localhost:4000");
        });
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB:", error);
    });


