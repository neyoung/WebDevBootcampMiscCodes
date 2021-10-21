const express = require('express');
const app = express();

/* anytime we get an incoming request by visiting localhost:3000 on web browser
this code run. There are also other ports to use, i.e. 8080
response is used to send back content */
/* can only do one res.send() per request*/
// app.use((request, response) => {
//     console.log('We got a new request');
//     // will display on web page as HTML with header content type as html
//     response.send('Hello, we got your request! This is a response!! ')
//     // will send as header content type: json
//     response.send({color: red});    
// });

// only responding to get request which is the same as visiting a website
app.get('/', (req, res) =>{
    res.send('Welcome to the homepage!');
});

app.get('/dogs', (req, res) => {
    res.send('Woof!');
});
// can also write app.post() for post request via i.e. PostMan
app.post('/dogs', (req, res) => {
    res.send('Woof! in post');
});

// will match get request with a pattern of /r/something/something
app.get('/r/:subreddit/:postID', (req, res) => {
    const { subreddit, postID} = req.params;
    res.send(`This is postID ${postID} on ${subreddit} subreddit.`);
});

// for handling search request
app.get('/search', (req, res) => {
    const { q } = req.query;
    console.log(q);
    console.log(req.query);
    if(!q) {
        res.send('Nothing found if nothing searched');
    }
    res.send(`<h1>Search Result for ${q}</h1>`);
});
// to handle all other get(routes/URL) not defined above this line
app.get('*', (req, res) => {
    res.send('Error, the page you requested does not exist!');
});

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});