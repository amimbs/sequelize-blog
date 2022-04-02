
const express = require('express');
const { Op } = require('@sequelize/core')

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

    models.blog_post.create({ title: title, body: body, catagories: catagories }).then((post) => {
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
app.put('/app/:id', (req, res) => {
    let id = parseInt(req.params.id);

    models.blog_post.findByPk(id).then((post) => {
        if (!post) {
            res.json({ errors: 'Invalid ID' })
        } else {
            post.update({
                title:req.body.title,
                body:req.body.body,
                catagories:req.body.catagories
            })
            res.json(post);
        }
    })
});

// GET Ability to filter posts based on their categories
app.get('/app/:catagory', async(req, res) => {
    let {catagory} = req.params
    const data = await models.blog_post.findAll({
        where: {
            catagories: {
                [Op.iLike]: `%${catagory}%`
            }
        }
    })
    // console.log(data)
    res.json(data)
});

// DELETE Ability to delete a post
app.delete('/app/:id', (req, res) => {
    let id = parseInt(req.params.id);

    models.blog_post.findByPk(id).then((post) => {
        if (post) {
            post.destroy();
        }
        res.status(201).json({ result:`Id: ${id} deleted.`})
    })
});

app.listen(8080, function () {
    console.log('The app is now listening on port 8080...');
});
