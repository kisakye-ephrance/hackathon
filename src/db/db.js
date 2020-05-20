//connect to the database by requiring mongoose,
const mongoose = require('mongoose')

//use mongoose connect that takes in the database url as one of its parameters
mongoose.connect(process.env.mongodb_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
})