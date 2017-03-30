var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var fs = require('fs');
var db = mongojs('DBLPTD', ['dblp']);
var app = express();

/*
var logger = function(req,res,next){
  console.log('Logging ..');
  next();
};
app.use(logger);
*/
//View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

// Body Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Global Vars
app.use(function(req,res,next){
    res.locals.errors = null;
    next();
});
// Express Validator MiddleWare
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


app.get('/', function(req,res){
  db.dblp.find(function(err,docs){
      res.render('index', {
        docs : docs
});
})
});



app.listen(8080, function(){
  console.log('Server Started on Port 8080');
})




/*// Set Sttic path
app.use(express.static(path.join(__dirname,'public')));
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var spotSchema = new mongoose.Schema({
                  _id: Schema.Types.ObjectId,
                  commune: String,
                  cCOMMUNE: String,
                  site: String,
                  surf: Number, kite_surf: Number, wind_surf: Number,
                  maj: String, producteur: String,
                  coordinates : [Number,Number] }, { collection :'surfspot' });

var spotsModel = mongoose.model('spotsModel',spotSchema);
app.get('/', function(req,res){
  db.surfspot.find(function(err,docs){
    console.log(docs);
      res.render('index', {
        spots : docs
});
})
});


*/
