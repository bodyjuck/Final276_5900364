var port = process.env.PORT || 8081;
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
        

        if(data.myNum == RandomNum)
        {
            var result = {text:"Win"}

        }
        else if(data.myNum < RandomNum)
        {
            var result = {text:"Less"}

            
            socket.broadcast.emit("getResponMess", {myID:data.myID,myNum:data.myNum});
        }
        else if(data.myNum > RandomNum)
        {
            var result = {text:"Most"}

            
        }

        socket.emit("getResponStatus",result);
        
        
        
    });
});