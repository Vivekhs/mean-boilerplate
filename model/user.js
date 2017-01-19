var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    userName: {type:String, unique:true},
    password: String,
    firstName: String,
    lastName: String
});

userSchema.statics.addUser = function(userDetails, callback){
    console.log('Inside Add user', userDetails);
        this.create({
                    "userName":userDetails.userName, 
                    "password":userDetails.password,
                     "firstName":userDetails.firstName,
                     "lastName":userDetails.lastName
                    }, function(err, result){
                        if(err){
                            console.log(err);
                            callback(err, null);
                        }
                        else{
                            callback(null, result);
                        }
        });
    
}

userSchema.statics.verifyUser = function(userName, callback){
            console.log(userName);
            this.findOne({"userName":userName}, {_id:0,password:1}, function(err, result){
                if(err) {
                    console.log(err);
                    callback(err, null);
                }
                else{
                    console.log(result);
                    callback(null, result);
                }
            });
}

module.exports = mongoose.model('users', userSchema);