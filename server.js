#!/usr/bin/env node
var http = require('@thecoder08/http');
var games = {};
http.server(25567, function(req, res, redirect) {
  if (req.pathname == '/new') {
    var letter1 = String.fromCharCode(Math.round(Math.random() * 26) + 64);
    var letter2 = String.fromCharCode(Math.round(Math.random() * 26) + 64);
    var letter3 = String.fromCharCode(Math.round(Math.random() * 26) + 64);
    var letter4 = String.fromCharCode(Math.round(Math.random() * 26) + 64);
    var id = letter1.concat(letter2, letter3, letter4);
    games[id] = {};
    res(200, 'text/plain', id);
  }
  else if (req.pathname == '/join') {
    if (games[req.query.id]) {
      games[req.query.id][req.query.username] = 0;
      res(200, 'text/plain', 'game joined successfully');
    }
    else {
      res(404, 'text/plain', '404 game not found');
    }
  }
  else if (req.pathname == '/get') {
    if (games[req.query.id]) {
      res(200, 'text/plain', JSON.stringify(games[req.query.id]));
    }
    else {
      res(404, 'text/plain', '404 game not found');
    }
  }
  else if (req.pathname == '/gobble') {
    games[req.query.id][req.query.username]++;
    res(200, 'text/plain', 'gobbled successfully');
  }
  else {
    res(404, 'text/plain', '404 command not found');
  }
  console.log(games);
});
