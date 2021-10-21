const express = require('express');
const morgan = require('morgan');
const AppError = require('./AppError');
const app = express();

// app.use is called for every single route request and path
app.use(morgan('tiny'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    console.log('This is my first middleware');
    next();
    // will print after all middlewares is executed
    console.log('This is my first middleware -- after next()')
});
app.use((req, res, next) => {
    console.log('This is my second middleware');
    return next();
    // will never print to console because of the 'return' code
    console.log('This is my second middleware');
});
// The last 'app.use' to execute since no other next() was called
app.use((req, res, next) => {
    console.log('This is my third middleware');
    console.log(req.method, req.path);
    next()
});
// middleware example
const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'Booya') return next();
    throw new AppError('password require', 401);
}

app.get('/', (req, res) => {
    console.log(`Request date: ${req.requestTime}`);
    res.send('Home page');
});

app.get('/error', (req, res) => {
    chicken.fly();
});

/* If password is correct next() will execute (req, res)...
 * Otherwise, that code will not execute since next() is not called
*/
app.get('/secret', verifyPassword, (req, res) => {
    res.send('Welcome to the Secret page!');
})
app.get('/admin', (req, res) => {
    throw new AppError('You are not an Admin', 403)
})

// response when a request cant be found
app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
    const {status = 500, message = 'Something went wrong.'} = err;
    res.status(status).send(message);
});

app.listen(3000, () => {
    console.log('App is running on localhost:3000');
});