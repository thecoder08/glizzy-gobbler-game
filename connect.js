function newGame() {
  document.location.href = 'game.html?start=newgame&username=' + $('#username').value;
}
function joinGame() {
  document.location.href = 'game.html?start=joingame&username=' + $('#username').value + '&id=' + $('#code').value;
}
