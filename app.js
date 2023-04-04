const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb
const dbURI = '[REDACTED]';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    // listen for requests if connection to db
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public')); // for static files in public folder
app.use(express.urlencoded({ extended: true })); // takes url encoded data and parses into object
// third-party logging middleware to do above
app.use(morgan('dev'));

app.get('/', (req, res) => { 
    res.redirect('/blogs');
});

app.get('/about', (req, res) => { 
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
// use this function for every incoming request (if code reaches this point)
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
