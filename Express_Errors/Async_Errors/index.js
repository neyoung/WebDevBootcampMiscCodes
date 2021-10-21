const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override') 

// imports the product.ejs
const Product = require('./models/product');
const AppError = require('./AppError');

const categories = ['fruit', 'vegetable', 'dairy']

mongoose.connect('mongodb://localhost:27017/farmStand2', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MONGO CONNECTION SUCCESSFUL!');
    })
    .catch((err) => {
        console.log('MONGO CONNECTION ERROR!');
        console.log(err);
    });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// for allowing application to access data submitted via HTML form
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e));
    }    
}


/****** INDEX.EJS ******/
// async call back example
app.get('/products', wrapAsync(async (req, res) => {
    const { category } = req.query; // returns {category: category}
    if(category) {
        // { category } is same as {category: category}
        // filter products by category
        const products = await Product.find({ category });
        res.render('products/index', {products, category})
    } else {   // returns all products in the Products database
        // async await is a better way to handle this than .then
        const products = await Product.find({});
        res.render('products/index', { products, category: 'All' });
    }
}));

/****** NEW.EJS ******/
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
})

/****** DETAILS.EJS ******/
app.get('/products/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/details', { product });

}));

/****** EDIT.EJS ******/
// Example of handling Async errors, 'next' parameter required
app.get('/products/:id/edit', wrapAsync(async ( req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    // return so that next line of code is not executed
    // this code will execute the app.use() code which is our error handler middleware
    if(!product) {
        throw new AppError('Product not found', 404);
    }
    res.render('products/edit', { product, categories });
}));

/****** Redirects to DETAILS.EJS ******/
app.post('/products', wrapAsync(async (req, res, next) => {
    // Use try catch for runtime errors i.e. product name is required but missing
    const newProduct = new Product(req.body);
    await newProduct.save(); // inserts product
    res.redirect(`/products/${newProduct._id}`);
}));

/****** Redirects to DETAILS.EJS ******/
app.put('/products/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true});
    res.redirect(`/products/${product._id}`);
}));

/****** Redirects to INDEX.EJS ******/
app.delete('/products/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    console.log(`${deletedProduct.name} has succesfully been deleted`);
    res.redirect('/products/');
}));

const handleValidationErr = err => {
    console.dir(err);
    //In a real app, we would do a lot more here...
    return new AppError(`Validation Failed...${err.message}`, 400)
}

app.use((err, req, res, next) => {
    console.log(err.name);
    //We can single out particular types of Mongoose Errors:
    if (err.name === 'ValidationError') err = handleValidationErr(err)
    next(err);
})

// this is our error handler middleware
app.use((err, req, res, next) => {
    const {status = 500, message = 'Something went wrong'} = err;
    res.status(status).send(message);
})
app.listen(3000, () => {
    console.log('App is listening on Port 3000');
});