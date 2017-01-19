var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var USER = require('../model/user');


router.post('/signup', function(req, res){
    console.log('Inside signup');

    var userDetails = req.body;
    var salt = bcrypt.genSaltSync(10);
    // Hash the password with the salt
    var hash = bcrypt.hashSync(userDetails.password, salt);
    userDetails.password = hash;

    USER.addUser(userDetails, function(err, result){

        if(err){
            res.status(500).send(err);
        }
        else{
            res.send(result);
        }
    });


});

router.post('/signin', function(req, res){
        console.log('Inside signin');
        var userDetails = req.body;
        USER.verifyUser(userDetails.userName, function(err, result){
            if(err){
                res.send({error:'Internal error occurred', data:null});
            }
            else{
                if(result == null){
                    res.send({error:'User does not exists', data:null});
                    return;
                }

                var status = bcrypt.compareSync(userDetails.password, result.password);
                if(status){
                    req.session.userName = userDetails.userName;
                    res.send({error:null, data:'Login successful...'});
                }
                else{
                  res.send({error:'Invalid userid or password', data:null});
                }
            }
        });

});

module.exports = router;
