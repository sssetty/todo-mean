
var express=require('express');
var path=require('path');
var fs=require('fs');
//var process=require('process');
var db=require('./dbConnect.js');
var app=express();
var bodyParser=require('body-parser');
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});
//app.listen(3000);
console.log("Server is running");
app.use(express.static('controllers'));
app.use(bodyParser.json());
//console.log(__dirname);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  delete require.cache[require.resolve('./dbConnect.js')];
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
app.get('/',function(request,response){
    response.sendFile(__dirname+"/index.html");

});
app.get('/controllers/todo.js',function(request,response){
    response.sendFile(__dirname+"/controllers/todo.js");

});
app.get('/todoList',function(request,response){
  console.log("request received");
  console.log("Inside server");
  db.getList().then(function(result){
   //console.log(result);
   response.json(result);
 },function(error){
   console.log(error);
 });
  });

  app.get('/todoList/:id',function(request,response){
    console.log("request received");
    console.log("Inside server");
    db.getTask(request.params.id).then(function(result){
     //console.log(result);
     response.json(result);
   },function(error){
     console.log(error);
   });
    });

app.post('/todoList',function(request,response){
console.log(request.body.task);
console.log(request.body.due);
db.addTask(request.body).then(function(res){
  if(res == true){
  response.send(true);
  }
});
});
app.delete('/todoList/:id',function(request,response){
console.log(request.params.id);

db.deleteTask(request.params.id).then(function(res){
  if(res == true){
  response.send(true);
  }
});
});

app.put('/todoList/:id',function(request,response){
  console.log(request.params.id);
  console.log(request.body);
  db.updateTask(request.params.id,request.body).then(function(res){
    if(res == true){
      response.send(true);
    }
  });
});
