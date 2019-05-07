var port = process.env.PORT || 3000;
var io = require('socket.io')(port);
var shortId = require('shortid');

var players = [];

var RandomNum = Math.floor(Math.random() * 100);

console.log("server started on port " + port);

console.log(RandomNum);

io.on("connection",function(socket){

    var thisPlayerId = shortId.generate();
    var player = {id:thisPlayerId}
    players[thisPlayerId] = player;

    console.log("client connect id = ", player);

    socket.emit("open", player);



    

    socket.on("Check",function(data){
        
        
        
        if(data.mynum == RandomNum)
        {
            var result = {text:"Win"}
        }
        else if(data.mynum < RandomNum)
        {
            var result = {text:"Less"}
        }
        else if(data.mynum > RandomNum)
        {
            var result = {text:"Most"}
        }

        console.log(result);
        
        socket.emit("getValue",result);
        
    });
});