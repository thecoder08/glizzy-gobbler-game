var username = new URL(document.location.href).searchParams.get('username');
var start = new URL(document.location.href).searchParams.get('start');
var eat = new Audio();
eat.src = 'eat.mp3';
var smack = new Audio();
smack.src = 'smacking-lips.mp3';
var mm = new Audio();
mm.src = 'm-m.mp3';
var id = '';
if (start == 'newgame') {
  request('http://34.67.110.14:25567/new', function(data) {
    id = data.toString();
  });
}
else {
  id = new URL(document.location.href).searchParams.get('id');
}
setTimeout(function() {
  $('#code').innerHTML = id;
  request('http://34.67.110.14:25567/join?username=' + username + '&id=' + id, function(data) {
   if (data.toString() == '404 game not found') {
     alert('Invalid code: ' + data.toString());
     document.location.href = 'connect.html';
   }
  });
}, 500);

function clickMe() {
  request('http://34.67.110.14:25567/gobble?username=' + username + '&id=' + id, function(data) {});
  var rand = Math.round(Math.random() * 10);
  if ((rand == 1) || (rand == 2) || (rand == 3) || (rand == 4) || (rand == 5) || (rand == 6)) {
    eat.stop();
    smack.stop();
    mm.stop();
    eat.play()
  }
  else if ((rand == 7) || (rand == 8)) {
    eat.stop();
    smack.stop();
    mm.stop();
    smack.play();
  }
  else if ((rand == 9) || (rand == 10)) {
    eat.stop();
    smack.stop();
    mm.stop();
    mm.play()
  }
}
setInterval(function() {
  request('http://34.67.110.14:25567/get?id=' + id, function(data) {
    var game = JSON.parse(data);
    $('#game').innerHTML = '';
    for (var person in game) {
      $('#game').innerHTML += person + ': ' + game[person] + '<br>';
    }
  });
  request('http://34.67.110.14:25567/end?id=' + id, function(data) {
    if (data == 'none') {

    }
    else if (data == username) {
      document.location.href = 'win.html';
    }
    else {
      document.location.href = 'lose.html?winner=' + data;
    }
  });
}, 10);
