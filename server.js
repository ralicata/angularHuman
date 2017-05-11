const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

const mainRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const PORT = process.env.PORT || 8080;
const DB = "mongodb://localhost/angularHuman";

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', mainRouter);
app.use('/api', apiRouter);

mongoose.connect(DB, (err) => {
    if(err){
        console.log(err);
        return err;
    } else {
        console.log("Successfully connected to " + DB);
    }
});

// SET view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// SET static 
app.use(express.static(path.join(__dirname, 'client')));

app.listen(PORT, () => {
    console.log('listening on port '+ PORT);
});