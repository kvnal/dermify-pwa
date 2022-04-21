const express = require("express")
const app = express();

app.use("/model",express.static(__dirname + '/model'));
app.use("/css",express.static(__dirname + '/css'));
app.use("/jscript",express.static(__dirname + '/jscript'));
app.use("/assets",express.static(__dirname + '/assets'));
app.use("/",express.static(__dirname + '/'));
app.use("/android",express.static(__dirname + '/android'));


app.get("/",(req,res)=>{
    return res.sendFile(__dirname+"/index.html")
})


const PORT = 4000;

app.listen(PORT,()=>{
console.log("listening on "+PORT);
})