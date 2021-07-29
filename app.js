const express = require('express');
const app = express();
const itemRoutes = require('./itemRoutes');
const MyError = require('./myError');

app.use(express.json());
app.use('/items', itemRoutes);

app.get('/', (req, res) => {
    return res.send("Please go to /items");
});

//404 error handler
app.use((req, res, next) => {
    let e = new MyError("Page not found!", 404);
    next(e)
});

app.use((err, req, res, next) => {
    let status = err.status || 500;

    return res.status(status).json({error: {
        message: err.message,
        status_code: status
    }});
});

module.exports = app;