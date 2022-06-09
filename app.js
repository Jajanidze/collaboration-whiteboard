let express = require("express");
let app = express();
let httpServer = require("http").createServer(app);
let io = require("socket.io")(httpServer);

let connections = [];

io.on("connect", (socket) => {
  connections.push(socket);
  console.log(`${socket.id} has connected`)

  socket.on("draw", (data) => {
      connections.forEach(connection=>{
          if(connection.id !== socket.id){
              connection.emit("ondraw",{x: data.x, y:data.y})
          }
      })
  });

  socket.on("pressed",(data)=>{
      connections.forEach(connection => {
          if(connection.id !== socket.id){
              connection.emit('onpressed',{x:data.x, y: data.y})
          }
      });
  })

  socket.on("disconnect", (r) => {
    console.log(`${socket.id} is disconnected`);
    connections = connections.filter((con) => con.id !== socket.id)
  });
});

app.use(express.static("public"))

let PORT = process.env.PORT || 8080
httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`))