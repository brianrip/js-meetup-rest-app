// import express from 'express';
var express = require('express');
var bodyParser = require('body-parser');
var monk = require('monk');

var app = express();
var port = 3000;

var db = monk('localhost/gameslocker', (err) => {
  if (err) console.error(err);
});
var games = db.get('games');

app.use(bodyParser.urlencoded({ encoded: false }));
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
  games.find({})
  .then((games) => {
    res.json(games)
  })
  .catch((err) => {
    console.error(err);

    res.status(400).json({ error: err });
  })
});

app.post('/api/games', function(req, res, next) {
  games.insert(req.body)
  .then(game => {
    console.log(game);
    res.json(game)
  })
  .catch((err) => {
    console.error(err);

    res.status(400).json({ error: err });
  })
});

app.delete('/api/games/:id', function(req, res, next) {
  const id = req.params.id

  games.findOneAndDelete({ _id: id })
  .then(game => {
    res.json(game)
  })
  .catch((err) => {
    console.error(err);

    res.status(400).json({ error: err });
  })
});

app.listen(port, function() {
  console.log(`app listening on port ${port}`);
});
