require('dotenv').config();

const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const app = express();

const connectDB = require('./config/db.js');
const router = require('./routes/product.route.js');


const errorHandler = require('./middlewares/errorHandler.js');
const logger = require('./middlewares/logger.js');

app.use(express.json());


app.use(logger);

app.use('/api', router);


connectDB();

app.use(errorHandler);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


///  6aab458b9e04067796877ec3