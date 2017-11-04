var PlayerService = function(callback){
    var playersData = [];
    var filteredPlayers = {}
    var myRoster = []
      
    function formatResults(arr){
      var set = 1
      var subArr = []
      for (var i = 0; i < arr.length; i++) {
        var elem = arr[i];
        if(subArr.length >= 20){
          filteredPlayers[set]= subArr
          set ++
          subArr = []
          subArr.push(elem)
        }else{
          subArr.push(elem)
        } 
      }
      if(subArr.length > 0 && set === 1){
        filteredPlayers[set]= subArr
      }
      else{
        filteredPlayers[set++] = subArr
      }
      console.log(filteredPlayers)
      return filteredPlayers
    }
    this.removeFromRoster = function (id,cb){
      for (var i = 0; i < myRoster.length; i++) {
        var player = myRoster[i];
        if(player.id == id){
          myRoster.splice(i, 1)
        }
        
      }console.log(myRoster)
      cb(myRoster)
    }
    this.addToRoster = function (id, cb) {
      // debugger
      for (var i = 0;i < playersData.length; i++) {
        var player = playersData[i]
        if (player.id == id) {          
          if(!myRoster.includes(player)){
            myRoster.push(player)        
          }else{    
            // debugger
            for (var j = 0; j < myRoster.length; j++) {
              var myPlayer = myRoster[j];
              myRoster.splice(j,1, myPlayer)
            }
          }
        }      
      }console.log(myRoster)
      cb(myRoster)     
    }
    
    this.getPlayersByTeam = function(teamName){
      filteredPlayers = {}
      return formatResults(playersData.filter(function(player){
        if(player.team.toLowerCase() == teamName.toLowerCase()){
          return true;
        }
      }));
      tempArr = []
    }
    
    this.getPlayersByPosition = function(position){
      filteredPlayers = {}
      return formatResults(playersData.filter(function(player){
        if(player.position.toLowerCase() == position.toLowerCase()){
          return true;
        }
      }));
    }
    this.getPlayersByName = function(lastName){
      filteredPlayers = {}
      return formatResults(playersData.filter(function(player){
        if(player.lastName.toLowerCase() == lastName.toLowerCase()){
          return true;
        }
      }));
    }
    this.getMyRoster = function () {
     
      return JSON.parse(JSON.stringify(myRoster))
    }
    
    function loadPlayersData(){
      
      //Lets check the localstorage for the data before making the call.
      //Ideally if a user has already used your site 
      //we can cut down on the load time by saving and pulling from localstorage 
      
      var localData = localStorage.getItem('playersData');
      if(localData){
        playersData = JSON.parse(localData);
        console.log(playersData)
      	return callback(); 
      	//return will short-circuit the loadPlayersData function
      	//this will prevent the code below from ever executing
      }
      
      var url = "https://bcw-getter.herokuapp.com/?url=";
      var endpointUri = "https://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
      var apiUrl = url + encodeURIComponent(endpointUri);
    
        $.getJSON(apiUrl, function(data){
          playersData = data.body.players.map(function(player){
            return {
              firstName: player.firstname,
              lastName: player.lastname,
              position: player.position,
              team: player.pro_team,
              playerImg: player.photo,
              id: player.id
            }
          });
          console.log('Player Data Ready')
          console.log('Writing Player Data to localStorage')
          localStorage.setItem('playersData', JSON.stringify(playersData))
          console.log('Finished Writing Player Data to localStorage')
          callback()
          console.log(playersData)
        });
    }	
loadPlayersData(); //call the function above every time we create a new service
} 