// routes/movie.routes.js

const express = require('express');
const router = express.Router();
// **** require Movie model in order to use it ****
const Movie = require('../models/Movie.model');

// ********* require fileUploader in order to use it *********
const fileUploader = require('../config/cloudinary.config');

router.get('/movies/create', (req, res) => res.render('movie-views/movie-create'));

router.post('/movies/create', fileUploader.single('movie-cover-image'), (req, res) => {
    const { title, description } = req.body;

    Movie.create({ title, description, imageUrl: req.file.path })
        .then(newlyCreatedMovieFromDB => {
            console.log(newlyCreatedMovieFromDB);
        })
        .catch(error => console.log(`Error while creating a new movie: ${error}`));
});

module.exports = router;