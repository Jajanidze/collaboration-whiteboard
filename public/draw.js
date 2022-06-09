const canvas = document.getElementById("canvas");

canvas.width = 0.98 * window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d');

ctx.font = "30px Arial";
ctx.fillText("Start Drawing", 15, 50);

var io = io.connect('http://localhost:8080')

let x, y;
let mousePressed;

window.onmousedown = (e)=>{
    ctx.moveTo(x,y);
    io.emit("pressed",{x,y})
    mousePressed = true
}

window.onmouseup = (e)=>{
    mousePressed = false
}

io.on("onpressed",({x,y})=>{
   ctx.moveTo(x,y)
})

io.on("ondraw",({x,y})=>{
    ctx.lineTo(x,y);
    ctx.stroke();
})

window.onmousemove=(e)=>{
    x=e.clientX
    y=e.clientY

    if(mousePressed){
        io.emit("draw",{x,y}); 
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}