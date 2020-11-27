var username = new URL(document.location.href).searchParams.get('username');
var start = new URL(document.location.href).searchParams.get('start');
var id = '';
if (start == 'newgame') {
  request('http://localhost:25567/new', function(data) {
    id = data.toString();
  });
}
else {
  id = new URL(document.location.href).searchParams.get('id');
}
setTimeout(function() {
  $('#code').innerHTML = id;
  request('http://localhost:25567/join?username=' + username + '&id=' + id, function(data) {
   if (data.toString() == '404 game not found') {
     alert('Invalid code: ' + data.toString());
     document.location.href = 'connect.html'
   }
  });
}, 500);

function clickMe() {
  request('http://localhost:25567/gobble?username=' + username + '&id=' + id, function(data) {
    console.log(username, id, data);
  });
}
setInterval(function() {
  $('#game').innerHTML = '';
  request('http://localhost:25567/get?id=' + id, function(data) {
    var game = JSON.parse(data);
    for (var person in game) {
      $('#game').innerHTML += person + ': ' + game[person] + '<br>';
    }
  });
}, 500);
