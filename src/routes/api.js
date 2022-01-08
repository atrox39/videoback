const { Movie } = require('../database/models/movie.model');
const path = require('path');
const fs = require('fs');
const route = require('express').Router();

// Middleware to charge all files in database
const movies_middleware = async function (req, res, next) {
    let moviesPath = path.join(__dirname, '..', 'public', 'movies');
    let files = fs.readdirSync(moviesPath);
    // Verify deleted files
    Movie.find()
        .then((files) => {
            if (files.length > 0) {
                files.map((file, i) => {
                    if (!fs.existsSync(file.serverPath)) {
                        Movie.findOneAndDelete({ _id: file._id }).then(
                            (del) => {}
                        );
                    }
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
    // Update database with al files
    files.map(async (file, i) => {
        if (file.endsWith('.mp4') || file.endsWith('.avi')) {
            let open = fs.readFileSync(path.join(moviesPath, file));
            let mbSize = (open.byteLength / 1024 / 1024).toPrecision(3);
            const actual = {
                title: file,
                serverPath: path.join(moviesPath, file),
                path: '/movies/' + file,
                size: mbSize,
            };
            const mv = await Movie.find(actual);
            if (mv.length <= 0) {
                await Movie.create(actual);
            }
        }
    });
    next();
};

route.use(movies_middleware);

route.get('/movies', async (req, res) => {
    const movies = await Movie.find().lean();
    res.json(movies);
});

module.exports = route;
