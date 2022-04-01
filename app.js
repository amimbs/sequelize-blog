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

// GET request

app.get('/app', (req, res) => {
    models.SeqTodo.findALL().then res => {
        res.json({ : })
    }
});

