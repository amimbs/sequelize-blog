const { response } = require('express');
const express = require('express');

// App Setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//static acts on the first instance of index within the public folder
app.use(express.static('./public'))

// this communicates with our database
const models = require('./models');

// Template Engine Configuration
app.set('view engine', 'ejs');

// Ability to create a new post
app.post('/app', (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let catagories = req.body.catagories;

    models.blog_post.create({title: title, body: body, catagories: catagories}).then((post) => {
        res.json(post)
    })
})

// GET Ability to view all posts
app.get('/app', (req, res) => {
    models.blog_post.findAll().then(all_posts => {
        res.json(all_posts)
    })
});

// PUT Ability to update a post


app.listen(8080, function () {
    console.log('Todo List App is now listening on port 8080...');
});
