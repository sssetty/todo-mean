module.exports.getList  =function() {
  return new Promise(function(resolve,reject){
//  console.log("dbConnect 2");
  var MongoClient = require('mongodb').MongoClient;
      //provide a sensible default for local development
mongodb_connection_string = 'mongodb://127.0.0.1:27017/TODOList';
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + 'TODOList';
}
  MongoClient.connect(mongodb_connection_string,function(err,db){
    if(!err){
        console.log("Connected to DB successfully");
       db.collection("todo",{strict :true},function(err,collection){
            if(err){
                //console.log(err);
                db.createCollection("todo",{strict :true},function(error,collection){
            if(error){
                console.log(error);
            }else{
                console.log("Created Collection");
                return null;
            }
        });
  }
        else{
           console.log("Successfully retreived the collection");
           console.log("yes");
            db.collection('todo').find().toArray(function(err,result){
              //console.log("dbConnect 22");
              // console.log(result);
               if(result != null) {
                //console.log("Inside dbconnect");
              //  console.log(results);
              //  return results;
                resolve(result);
               }else{
                 reject("Error");
               }
             });

           }
           });
       }
     else{
        console.log(err);
    }
});
});
};

module.exports.getTask  =function(id) {
  return new Promise(function(resolve,reject){
    var ObjectId = require('mongodb').ObjectID;
  var MongoClient = require('mongodb').MongoClient;
  //provide a sensible default for local development
mongodb_connection_string = 'mongodb://127.0.0.1:27017/TODOList';
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + 'TODOList';
}   
  MongoClient.connect(mongodb_connection_string,function(err,db){
    if(!err){
        console.log("Connected to DB successfully");
       db.collection("todo",{strict :true},function(err,collection){
            if(err){
              console.log(err);
  }
        else{
           console.log("Successfully retreived the collection");
           console.log("yes");
            db.collection('todo').find({_id :ObjectId(id) }).toArray(function(err,result){
              //console.log("dbConnect 22");
              // console.log(result);
               if(result != null) {
                resolve(result);
               }else{
                 reject("Error");
               }
             });

}
});
}
else{
  console.log("error");
}
});
});
};

module.exports.addTask  =function(todo){
//  console.log("dbConnect 2");
return new Promise(function(resolve,reject){
  var MongoClient = require('mongodb').MongoClient;
 mongodb_connection_string = 'mongodb://127.0.0.1:27017/TODOList';
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + 'TODOList';
}   
  MongoClient.connect(mongodb_connection_string,function(err,db){
    if(!err){
        console.log("Connected to DB successfully");
        db.collection('todo').insert(todo,function(err,result){
            if(err){
              reject(false);
                console.log("Error Inserting Document");
            } else{
                resolve(true);
                console.log(todo);
                console.log("Successfully Inserted the document");
            }
        });              //console.log("dbConnect 22");
      } else{
        console.log("error") ;
      }
             });

});
};
module.exports.deleteTask=function(taskID){
  return new Promise(function(resolve,reject){
    var MongoClient = require('mongodb').MongoClient;
    var ObjectId = require('mongodb').ObjectID;
 mongodb_connection_string = 'mongodb://127.0.0.1:27017/TODOList';
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + 'TODOList';
}   
  MongoClient.connect(mongodb_connection_string,function(err,db){
      if(!err){
          console.log("Connected to DB successfully");
          console.log(taskID);
          db.collection('todo').remove({ _id :  ObjectId(taskID) },function(err,result){
              if(err){
                reject(false);
                  console.log("Error Deleting Document");
              } else{
                  resolve(true);
                  console.log("Successfully deleted the document");
              }
          });              //console.log("dbConnect 22");
        } else{
          console.log("error") ;
        }
               });


});
};
module.exports.updateTask = function(id,todo){
return new Promise(function(resolve,reject){
  var MongoClient = require('mongodb').MongoClient;
  var ObjectId = require('mongodb').ObjectID;
mongodb_connection_string = 'mongodb://127.0.0.1:27017/TODOList';
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + 'TODOList';
}   
  MongoClient.connect(mongodb_connection_string,function(err,db){
      if(!err){
        console.log("Connected to DB successfully");
        console.log(id);
        db.collection('todo').update({_id : ObjectId(id)},{ $set : { task : todo.task, due : todo.due}},function(err,result){
            if(err){
              reject(false);
                console.log("Error Updating Document");
            } else{
                resolve(true);
                console.log("Successfully Updated the document");
            }
        });
      } else{
        console.log("error") ;
      }
             });

});
};
