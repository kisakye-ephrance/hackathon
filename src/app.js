//load express into the file
const express = require('express');

// require the express user Router
const userRouter = require('./routers/user')

//set the port number to be the number in the port environment
const port = process.env.port || 3000;

//require the db.js file that has the database connection
require('./db/db')

// create an express instance and assign it to an app
const app = express();

app.use(express.json())
app.use(userRouter)


app.listen(port, () => {
    console.log(`server running on port ${port}`)
});