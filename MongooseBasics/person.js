const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('CONNECTION SUCCESSFUL!');
    })
    .catch((err) => {
        console.log('CONNECTION ERROR!');
        console.log(err);
    });

const personSchema = mongoose.Schema({
    first: String,
    last: String
});

// silently adds the fullName property to the personSchema
personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`;
});

// .pre() and .post() are Middleware that executes before and after the save method is executed
personSchema.pre('save', async function () {
    this.first = 'YO';
    this.last = 'MAMA';
    console.log('About to save');
});

personSchema.post('save', async function () {
    console.log('Just Saved!!!');
});

const Person = mongoose.model('Person', personSchema);

const ngozi = new Person({
    first: 'Ngozi',
    last: 'Young'
})
ngozi.save()
    // fullName is not in the schema but is an accessible property
    .then(() => console.log(ngozi.fullName));