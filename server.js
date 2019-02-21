const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const axios = require('axios');


const app = express();

require("dotenv").config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('client/build'));

const MOVIE_KEY = process.env.API_KEY;
const MOVIE_URL = `https://api.themoviedb.org/3`

// let request = 'https://api.themoviedb.org/3/movie/550?api_key=d829137bb17cce3541db21a3b6a2cba1';
let request = 'https://api.themoviedb.org/3/movie/popular?api_key=d829137bb17cce3541db21a3b6a2cba1&language=en-US&page=1'

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});