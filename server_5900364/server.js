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
            var result = {myNum:"You Win"}
            
            socket.broadcast.emit("getResponMess", {myID:data.myID,myNum:data.myNum,status:"Win"});

            socket.emit("getResponStatus",result);

            RandomNum = Math.floor(Math.random() * 100);
        }
        else if(data.myNum < RandomNum)
        {
            var result = {myNum:"Your num is Less"}

            
        }
        else if(data.myNum > RandomNum)
        {
            var result = {myNum:"Your num is Most"}

            
        }

        if(data.myNum != RandomNum)
        {
            socket.emit("getResponStatus",result);

            socket.broadcast.emit("getResponMess", {myID:data.myID,myNum:data.myNum,status:""});

        }

        
        
        
        
    });
});