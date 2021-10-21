const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid')
const methodOverride = require('method-override');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) // sets the path for view folder as an absolute path
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded aka HTML forms
app.use(methodOverride('_method')); // for tricking HTTP to allow PATCH, DELETE, etc. request via form

// Our fake database:
let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
});

// Renders the New Comment page
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});
// Adds new comment + ID to array once Submit button is clicked on New page
app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    const id = uuid();
    comments.push({ username, comment, id });
    res.redirect('/comments/');
});

// Renders the details page for a single comment
app.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    const found = comments.find(c => c.id === id);
    res.render('comments/details', { found });
});

// Renders the edit page for a single comment
app.get('/comments/:id/edit', (req, res) => {
    const id = req.params.id;
    const found = comments.find(c => c.id === id);
    res.render('comments/edit', {found});
})

// Updates comment once Save button is clicked on Edit page
app.patch('/comments/:id', (req, res) => {
    const id = req.params.id;
    const found = comments.find(c => c.id === id);
    const newComment = req.body.comment;
    found.comment = newComment;
    res.redirect('/comments/');
})

// Deletes comment once delete button is clicked on Details or Edit page
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id; 
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments/');
})

/** END OF COMMENT APP */

app.get('/tacos', (req, res) => { 
    res.send('This is a /tacos get response');
});

app.post('/tacos', (req, res) => {
    console.log(req.body)
    const {meat, qty} = req.body
    res.send(`Your order for ${qty} ${meat} tacos was received.`)
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
})