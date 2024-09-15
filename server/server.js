require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const connectDb = require('./db/connectDb');
const connectRoutes = require('./routes/connectRoutes');
const session = require('express-session');
const passportSetup = require('./passport');  // JUST IMPORTING
const passport = require('passport');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json({
    limit: process.env.JSON_LIMIT
}));

app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']  // Allow only these HTTP methods in CORS headers
}));

app.use(logger('dev'));

// Configure express-session (Server-side session management)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'Production',  // Use secure cookies only in production
        maxAge: 24 * 60 * 60 * 1000  // 24 hours
    }
}));

// Initialize Passport for OAuth and custom authentication
app.use(passport.initialize());
app.use(passport.session());

// Connecting Routes
connectRoutes(app);

app.get('/api', (req, res) => {
    res.send('Hey welcome to API');
});

app.get('/', (req, res) => {
    res.send('Hey everything is working just fine');
});

app.get('*', (req, res) => {
    res.send('API is working but route not found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
    connectDb();
});
