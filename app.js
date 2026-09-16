require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require('./config/db.js');
const router = require('./routes/product.route.js');


const errorHandler = require('./middlewares/errorHandler.js');
const logger = require('./middlewares/logger.js');

app.use(express.json());
app.use('/api', router);


connectDB();

app.use(logger);
app.use(errorHandler);


app.listen(process.env.PORT, ()=> {
    console.log("Server is running on port")
})


//gamewiz170_db_user
//L3xnUy2p5tZYsj4U















