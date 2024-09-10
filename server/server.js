require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const connectDb = require('./db/connectDb');
const connectRoutes = require('./routes/connectRoutes');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({
    limit: process.env.JSON_LIMIT
}));

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(logger('dev'));


// Connecting Routes
connectRoutes(app);


app.get('/api', (req, res) => {
    res.send('Hey welcome to API');
})
app.get('/', (req, res) => {
    res.send('Hey every thing is working just fine');
})
app.get('*', (req, res) => {
    res.send('API is working but route not found');
})


app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
    connectDb();
})
