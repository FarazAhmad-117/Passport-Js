const auth = require('./auth');

const connectRoutes = (app) => {
    app.use('/auth', auth);
}


module.exports = connectRoutes;