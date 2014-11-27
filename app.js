/**
 * Created by venkat on 18/11/14.
 */
var express = require('express');
var Name = require('./server/models/name');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
mongoose.connect('mongodb://localhost/test');

var schema = new mongoose.Schema({name:'String'});
var Todo = mongoose.model('Todo',schema);

//app.use(express.basicAuth('testUser', 'testPass'));
var router = express.Router();
router.use(function(req,res, next){
   console.log(req.method);
    next();// callback..?

});



app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());

var port = 8000;
console.log(process.env.PORT);

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","http://localhost:9000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.route('/names')
    .post(function(req,res){
        var name = new Name();
        name.name = req.body.name;
        name.save(function(err){
            if(err){
                console.log('err in saving');
                res.send(err);
            }else {
                res.json({message:'Name is inserted'});
            }
        })
    })
    .get(function(req,res){
        Name.find(function(err,names){
            if(err){
                res.send(err);
            }else{
                res.json(names);
            }
        })
    });
router.route('/names/:name_id')
    .get(function(req,res){
        Name.findById(req.params.name_id,function(err,data){

            if(err){
                res.send(err);
            }else {
                res.json(data);
            }
        })
    })
    .put(function(req,res){
        Name.findById(req.params.name_id,function(err,data){
            if(err){
                res.send(err);
            }else{
                data.name = req.body.name;
                data.save(function(err){
                    if(err){
                        res.send(err);
                    }else{
                        res.json(data);
                    }
                });
            }
        });
    })
    .delete(function(req,res){
        Name.remove({
            _id:req.params.name_id
        }, function(err,data){
            if(err){
                res.send(err);
            }else {
                res.json({message:'removed',data:data});
            }
        })
    });

router.get('/',function(req,res){
    res.json({message:"first api with node"});

});

app.use('/api',router);
app.listen(port,function(){
    console.log("api started at ",port);

});
