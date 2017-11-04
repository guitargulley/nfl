var PlayerController = function () {
  var loading = true; //Start the spinner
  var playerService = new PlayerService(ready);
  var filteredPlayers = {}
  var page = 1
  
  
  
  
  function ready() {
    loading = false; //stop the spinner

    //Now that all of our player data is back we can safely setup our bindings for the rest of the view.
  }


  this.getPlayersByTeam = function getPlayersByTeam(e) {
    // debugger
    e.preventDefault();
    var teamName = e.target.teamName.value;
    filteredPlayers = playerService.getPlayersByTeam(teamName)
    console.log(filteredPlayers)
    document.forms["filter-position-form"].reset()
    document.forms["filter-lastName-form"].reset()
    page = 1
    draw()
  }
  this.setPage = function setPage(num){
    page = num
    draw()
  }

  this.getPlayersByPosition = function getPlayersByPosition(e) {
    e.preventDefault();
    var position = e.target.position.value;
    filteredPlayers = playerService.getPlayersByPosition(position)
    console.log(filteredPlayers)
    document.forms["filter-team-form"].reset()
    document.forms["filter-lastName-form"].reset()
    page = 1
    draw()

  }
  this.addToRoster = function addToRoster(id){
    playerService.addToRoster(id, drawMine)
  }

  this.getPlayersByName = function getPlayersByName(e){
    e.preventDefault();
    var lastName = e.target.lastName.value;
    // debugger
    filteredPlayers = playerService.getPlayersByName(lastName)
    console.log(filteredPlayers)
    document.forms["filter-position-form"].reset()
    document.forms["filter-team-form"].reset()
    page = 1
    draw()
  }

  this.displayNflRoster = function displayNflRoster(){
    document.getElementById('my-roster-div').classList.add('hidden');
    document.getElementById('my-roster').classList.add('hidden');
    document.getElementById('nfl-roster-div').classList.remove('hidden') 
    document.getElementById('playerList').classList.remove('hidden') 
    
    
  }
  this.displayMyRoster = function displayMyRoster(){
    document.getElementById('nfl-roster-div').classList.add('hidden')
    document.getElementById('playerList').classList.add('hidden') 
    document.getElementById('my-roster-div').classList.remove('hidden') 
    document.getElementById('my-roster').classList.remove('hidden'); 
    
  }

  function draw() {
    var template = ''
    var currentArr = filteredPlayers[page]

    for (var i = 0; i < currentArr.length; i++) {  
        var player = currentArr[i];
        template += 
        `
        <div class="col-xs-3 text-center players">
          <img src="${player.playerImg}" alt="">
          <h3>${player.firstName} ${player.lastName}</h3>
          <h4>${player.team}</h4>
          <h4>${player.position}</h4>
          <button onclick="app.controllers.playerController.addToRoster(${player.id})">Add to roster</button>
        </div>
        `     
    }
    var pageTemplate = ''
    for (var i = 1; i <= Object.keys(filteredPlayers).length; i++) {
      pageTemplate += `
      <button onclick="app.controllers.playerController.setPage(${i})">${i}</button>
      
      `
      
    }
    document.getElementById('playerList').innerHTML = template
    document.getElementById('pages').innerHTML = pageTemplate
  }


  function drawMine(arr){
        var elem = document.getElementById('my-roster')
        var myTemplate = ''
        for (var i = 0; i < arr.length; i++) {
          var player = arr[i];
          
          myTemplate += 
          `
          <div class="col-xs-3 text-center players">
            <img src="${player.playerImg}" alt="">
            <h3>${player.firstName} ${player.lastName}</h3>
            <h4>${player.team}</h4>
            <h4>${player.position}</h4>
            <button onclick="app.controllers.playerController.removeFromRoster(${player.id})">Remove from Roster</button>
          </div>
          ` 
        }
    
      
      elem.innerHTML = myTemplate
      }


}