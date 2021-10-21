const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('CONNECTION SUCCESSFUL!');
    })
    .catch((err) => {
        console.log('CONNECTION ERROR!');
        console.log(err);
    });

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number, 
    rating: String
});

// the variable and argument typically have the same name which should be captilized and singular
// a collection will be auto-created in plural and all lowercase
const Movie = mongoose.model('Movie', movieSchema)
// amadeus.save() should be called afterwards before the object will save to DB
/* const amadeus = new Movie({
    title: 'Amadeus',
    year: 1986,
    score: 9.2, 
    rating: 'R'
});
const theNoteBook = new Movie({
    title: 'The Notebook',
    year: 2004,
    score: 7.8, 
    rating: 'PG-13'
});
amadeus.save();
theNoteBook.save();

// insertMany() will auto save data into database
Movie.insertMany([
    { title: 'Amelie', year: 2001, score: 8.3, rating: 'R' },
    { title: 'Alien', year: 1979, score: 8.1, rating: 'R' },
    { title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG' },
    { title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R' },
    { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13' }
])
    .then((data) => {
        console.log('Movies saved!');
        console.log(data);
    }) */