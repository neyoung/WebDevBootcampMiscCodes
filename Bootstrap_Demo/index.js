const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');

// adds EJS to project
app.set('view engine', 'ejs');
// adds public folder to the project and sets the public folder path as an absolute path
// public folder will contain .css, images, scripts that we need to reference in this project
app.use(express.static(path.join(__dirname, '/public')));
// sets the absolute path of the views folder
app.set('views', path.join(__dirname, '/views'));


// Renders the home.ejs file which essentially contains HTML
app.get('/', (req, res) => {
    res.render('home.ejs', { title: 'Homepage'});
});

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    const name = 'Ngozi';
    // multiple ways to pass the property: key or variable in an object  
    res.render('random', { rand: num, name, title: 'Random Number Generator'});
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if(data) {
        // .ejs in the file name param is optional 
        res.render('subreddit.ejs', {subreddit, ...data, title: 'Subreddit Page' });
    } else {
        res.render('notfound', {subreddit, title: 'Page Not Found'});
    }
});

app.get('/cats', (req, res) => {
    const cats = ['Luna', 'Bella', 'Oliver', 'Charlie', 'Lucy'];
    res.render('cats', { cats, title: 'Cats' });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});