
// define which season
var season = 20182019
// put ID from HTML file into players variable
let players = document.getElementsByClassName("Players");

// loop through the players elements and retrieve stats
for (let player of players) {
  getPlayerStats(player.id, season);
}

// a function to pull data from API, based on variables declared above
function getPlayerStats(playerId, season) {
  //define API start here
  var request = new XMLHttpRequest();

  //open API request here to the API you want to use
  request.open('GET', 'https://statsapi.web.nhl.com/api/v1/people/' + playerId + '/stats?stats=gameLog&season=' + season, true);
  request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    
    if (request.status >= 200 && request.status < 400) {
      var noOfGoals = countGoals(data);
      drawGoals(noOfGoals,playerId);
    } else {
      console.error('No Data!');
    }
  }
  request.send();
}

// Go through array and count all "goals"
function countGoals(hest) {
  var noGoals = 0;
  hest.stats[0].splits.forEach(function(game) {
    noGoals += game.stat.goals;
  });
  return noGoals;
}

// Write to HTML 
function drawGoals(goals,elementId) {
  document.getElementById(elementId).innerText=goals;
}