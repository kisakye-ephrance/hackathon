//create the user model by loading the required packages
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')

const Userschema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    },
    email: {
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if(!validator.isemail(value)) {
                throw new error ({error: 'invalid email address'})
            }
        }
    },
    //the token enables a user to be logged in on different devices and once they log out of a device, they are still logged in on another device
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
});

Userschema.pre('save', async function (next){
    //hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
});

//this method uses the jwt to create a token
Userschema.methods.generateAuthToken = async function () {
const user = this
const token = jwt.sign({_id: user._id})
user.tokens = user.tokens.concat({token})
await user.save()
return token
}

//finding a user by given credentials
Userschema.statics.findByCredentials = async (email, password) => {
    //find a userby email
    //if a user is not found
    const user = await user.findone({email})
    if(!user) {
        throw new Error({error: 'invalid login credentials'})
    }
    //compare the password given by the user
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    //if they dont match throw an error
    if(!isPasswordMatch) {
        throw new Error({ error: 'invalid login credentials'})
    }
    //if everything goes well, return the user
    return user
};

const User = mongoose.model('User', Userschema)

module.exports = User;
