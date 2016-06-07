var mongo = process.env.VCAP_SERVICES; // nodejs environment를 불러와 mongodb와 연결함.
var port = process.env.PORT || 3030;


//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://wonyoung:dnjsdud1@aws-us-east-1-portal.11.dblayer.com:28085,aws-us-east-1-portal.10.dblayer.com:11361/bikeDatabase';

// Use connect method to connect to the Server
/*
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});*/




var express = require('express'); // nodejs express module 추가
var app = express(); 
var bodyParser = require('body-parser'); // get 으로 호출할 때 body의 내용을 parsing하기 위해 body-parser module 추가
app.use(bodyParser.json());     //bodyparser로 json 형식을 따른 다는 것을 선언.
app.use(express.static(__dirname + '/public'));


app.get('/index', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

app.get('/how', function (req, res) {
  res.write('Two APIs are provided: "/api/insertMessage" and "/api/render"' + "\n"
    + 'When "/api/insertMessage" is called, messages will be written to database' + "\n"
    + 'When "/api/render" is called, the inserted message will be shown');
  res.end();	
});



app.get('/api/insertMessage', function (req, res) {
	
	

	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
	  if (err) {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	  } else {
	    //HURRAY!! We are connected. :)
	    console.log('Connection established to', url);

	    

		////// insert start
	    var message = { 'message': 'Hello, this is BIKE!!!', 'ts': new Date() };
	    if (db && db !== "null" && db !== "undefined") {
	      db.collection('bikeDB').insert(message, {safe:true}, function(err){
	        if (err) { 
	          console.log(err.stack);
	          res.write('mongodb message insert failed');
	          res.end(); 
	        } else {
	          res.write('following messages has been inserted into database' + "\n" 
	          + JSON.stringify(message));
	          res.end();
	        }
	      });    
	    } else {
	      res.write('No mongo found');
	      res.end();
	    } 
	    
	    // insert end.....
	    
	    
	    
	    
	    db.close();
	  }
	});

	
	
	
  
  
  
});
/*

app.post('/api/add', function (req, res) {
	var message = req.body; // json형식의 내용을 post로 가지고와서 body의 내용을 가져옴
	console.log("messages:" + message);
	
	  if (db && db !== "null" && db !== "undefined") {
	  	//db추가 mongodb의 경우 json형식을 그대로 저장하게 된다.
	  db.collection('messages').insert(message,  {safe:true}, function(err, cursor) {
	      if (err) { 
	          console.log(err.stack);
	          res.write('mongodb message insert failed');
	          res.end(); 
	        } else {
	          res.write('following messages has been inserted into database' + "\n" 
	          + JSON.stringify(message));
	          res.end();
	        }
	      });    
	    } else {
	      res.write('No mongo found');
	      res.end();
	    } 
	  });

*/
app.get('/api/render', function (req, res) {
	
	

	MongoClient.connect(url, function (err, db) {
	  if (err) {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	  } else {
	    console.log('Connection established to', url);

		
	    if (db && db !== "null" && db !== "undefined") {
	      // mongodb의 messages table에 있는 것을 10개 한도롤 가져온다는 의미이다.
	      //limit, sort와 같이 옵션을 줄 수있다. 이런 옵션은 mongodb 특성이다.
	      db.collection('bikeDB').find({}, {limit:10, sort:[['_id', 'desc']]}, function(err, cursor) {
	        if (err) {
	          console.log(err.stack); 
	          res.write('mongodb message list failed');
	          res.end();
	        } else {//만약 find하여 에러가 나지 않는 경우 json array로 출력한다.
	          cursor.toArray(function(err, items) {
	            if (err) {
	              console.log(err.stack); 
	              res.write('mongodb cursor to array failed');
	              res.end();
	            } else {
	              res.writeHead(200, {'Content-Type': 'text/plain'});
	              for (i=0; i < items.length; i++) {
	                res.write(JSON.stringify(items[i]) + "\n");
	              }
	              res.end();
	            }
	          });
	        }
	      });     
	    } else {
	      res.write('No mongo found');
	      res.end();  
	    }
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    db.close();
	  }
	});
	
	
	
  
  
});


app.listen(port);