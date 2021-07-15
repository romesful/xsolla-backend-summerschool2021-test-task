const express = require('express');
const router = require('./routes/mainRouter');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });

app.use(express.json());
app.use('/api', router);
app.get('/', (req, res) => {console.log(req); res.send('ok!');})

app.listen(process.env.PORT);