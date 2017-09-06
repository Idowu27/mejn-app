const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

/* this variable allows us to use the databse when we handle requests from the browser*/
var db

 MongoClient.connect('mongodb://idowu27:blues27@ds123534.mlab.com:23534/star-wars-quotez', (err, database) => {
   if (err) return console.log(err)
   db = database
   app.listen(3000, () => {
     console.log('listening on 3000')
   })
 })

app.use(bodyParser.urlencoded({extended: true}))

/*replace function with => after the parameters*/

app.get('/', (req, res) => {
  /*the sendFile has index served back to the browser instead */
    res.sendFile(__dirname + '/index.html')
/*use the find method to get quotes from MongoLab*/
    var cursor = db.collection('quotes').find().toArray(function(err,results){
      console.log(results)
    })
  })

  app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)

      console.log('saved to database')
      res.redirect('/')
    })
  })




console.log('May node be with you')
