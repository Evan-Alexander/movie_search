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




app.get('/', (req, res) => {
  const url = 'https://api.themoviedb.org/3/movie/popular?api_key=d829137bb17cce3541db21a3b6a2cba1&language=en-US&page=1'
	// const url = `${MOVIE_URL}/movie/${movieID}?api_key=${MOVIE_KEY}&language=en-US`;	

  axios.get(url)
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
})

app.get('/movie/:id', (req, res) => {
  //build api URL with movieID
  let movieID = req.params.id;
	const url = `${MOVIE_URL}/movie/${movieID}?api_key=${MOVIE_KEY}&language=en-US`;	

	axios.get(url)
	.then(res => res.json())
	.then(data => {
		res.send(data)
	})
	.catch(err => {
		res.redirect('/error');
	});
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});