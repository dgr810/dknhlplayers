// function call to dig out all goals from API dataset.
function getGoals(data) {
  var noOfGoals = 0;
  data.stats[0].splits.forEach(function (game) {
    noOfGoals += game.stat.goals;
    // console.log(noOfGoals);
  });
  return noOfGoals;
}
// function call to dig out all saves from API dataset and put it into "noOfSaves"
function getSaves(data) {
  var noOfSaves = 0;
  data.stats[0].splits.forEach(function (game) {
    noOfSaves += game.stat.saves;
    console.log(noOfSaves);
  });
  return noOfSaves;
}
// define which season to get data from
var season = 20182019

// Define what variable to use from the HTML (Player)
let players = document.getElementsByClassName("Player");

// loop through the player elements from the HTML and retrieve player and season and put it into function.
for (let player of players) {
  getPlayerStats(player, season);
}
// a big function to pull data from API, based on variables declared above. Results end in "data"
function getPlayerStats(player, season) {
  var playerId = player.id;
  //define API start here
  var request = new XMLHttpRequest();

  //open API request here to the API you want to use. Use input from PostMan
  request.open('GET', 'https://statsapi.web.nhl.com/api/v1/people/' + playerId + '/stats?stats=gameLog&season=' + season, true);
  request.onload = function () {

    // Declare the data variable. It will contain data from the API call.
    var data = JSON.parse(this.response);

    // If data input is good, put data into HTML at each player element (innertext)
    if (request.status >= 200 && request.status < 400) {
      var noOfSaves = getSaves(data);
      if (Number.isNaN(noOfSaves)) {
        player.innerText = getGoals(data);
      }
      else {
        player.innerText = noOfSaves;
      }
    } else {
      console.error('No Data!');
    }
  }
  request.send();
}