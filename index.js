var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = require('./database');
var app = express();
var router = express.Router();
app.listen(8000);
app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

var bookScheme = mongoose.Schema(
    {
        name:String,
        members:String,
        mobile:String,
        email:String
    }
)
var bookModel = mongoose.model('Booking',bookScheme);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/'+"index.html"); 
 });

app.get('/book',function(req, res){
    res.sendFile(__dirname + '/form.html');
})


app.post('/confirm-booking', function(req, res){
    console.log(req.body);  
    var name = req.body.name;
    var members = req.body.members;
    var email = req.body.email;
    var mobile = req.body.mobile;
    let booking = new bookModel(
        {
            name : name,
            members : members,
            email : email,
            mobile : mobile,
        }
    )
    booking.save(function(err,book){
        if(err){
            res.send(err);
        }else{
            res.redirect('/');
        }
    })
    
})


var pizza = [
    {
        title : 'Pizza',
        content : 'Pizza Content',
        price : '120'
    }
]

var starters = [
    {
        title : 'Starters',
        content : 'Starters Content',
        price : '80'
    }
]

var drinks = [
    {
        title : 'Drinks',
        content : 'Drinks Content',
        price : '30'
    }
]


app.get('/menu', function(req, res) {
    res.render(__dirname + '/menu.html',{pizza:pizza,starters:starters,drinks:drinks});
})


