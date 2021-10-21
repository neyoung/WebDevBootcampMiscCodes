const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('CONNECTION SUCCESSFUL!');
    })
    .catch((err) => {
        console.log('CONNECTION ERROR!');
        console.log(err);
    });

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    price: {
        type: Number, 
        required: true,
        min: 0
    },
    onSale: {
        type: Boolean,
        default: false
    }, 
    categories: [String],

    qty: {
        online : {
            type: Number,
            default: 0
        }, 
        inStore: {
            type: Number,
            default: 0
        },
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L'],
        default: 'M'
    }

});

// how to add an instance method to our Product model
// which will affect only individual instance of a Product model
productSchema.methods.greet = function () {
    console.log(`Helloooooooo, I'm ${this.name}` );
}

// how to add a static method to our Product model
// which will affect all objects in the Product model
productSchema.statics.fireSale = function () {
    return this.updateMany({}, {onSale: true, price: 0})
}

const Product = mongoose.model('Product', productSchema);
const bike = new Product ({
    name: 'Dirt Bike',
    price: 199,
    categories: ['Cycling','Dirt'],
    'qty.online': 10,
    size: 'L'
});
const bike2 = new Product ({
    name: 'Hill Bike',
    price: 399,
    categories: ['Cycling','Road'],
    'qty.online': 3
});
const bike3 = new Product ({
    name: 'Chopper',
    price: 799,
    categories: ['Leisure','Road'],
    'qty.online': 1,
    'qty.inStore': 3,
    onSale: true,
    size: 'S'
});
// saveToDb(bike);
// saveToDb(bike2);
// saveToDb(bike3);

const findProduct = async () => {
    const foundProduct = await Product.findOne({name: 'Chopper'});
    foundProduct.greet();
}

findProduct();
Product.fireSale().then(msg => console.log(msg));

function saveToDb (prod) {
    prod.save()
    .then(data => {
        console.log('Data saved!');
        console.log(data);
    })
    .catch(err =>{
        console.log('Error occured!');
        console.log(err);
    });
}


// If runValidators is not set to true, the validation are ignored when updating data
// this code will return error that `price` (-19.99) is less than minimum allowed value (0). 
/* Product.findOneAndUpdate({name: 'Mountain Bike'}, {price: -19.99}, {new: true, runValidators: true})
        .then(data => {
            console.log('Data saved!');
            console.log(data);
        })
        .catch(err =>{
            console.log('Error occured!');
            console.log(err);
        }); */

// deletes the ids listed in the array
// .exec() Executes the deleteMany() query
// Product.deleteMany({_id: {$in: ['6112d20c567d43734a5faf84', '6112d215aac18a735185e429']}}).exec();