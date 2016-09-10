const http = require("http");
const server = http.createServer(require("./app"));
const db = require('./db');

if(process.env.SYNC){
  db.sync()
  .then(function(result){
    console.log("tables created")
  })
  .catch(function(err){throw err});
}

server.listen(process.env.PORT, function(){
	console.log ( "listening on port " + process.env.PORT);
});
