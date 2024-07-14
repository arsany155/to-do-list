const express = require("express")
const app =express()
const cors = require("cors")
const UserPath = require("./Routes/userRoute")
const TaskPath = require("./Routes/taskRoute")

const morgan = require("morgan")    
const connectTODB = require("./config/db")

const errors = require("./Middlewares/errors")


//env
require("dotenv").config()

//connection to database
connectTODB()

if (process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
    console.log(`mode: ${process.env.NODE_ENV}`) 
}

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: '*',  //
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // Enable cookies and credentials for cross-origin requests
    optionsSuccessStatus: 204,  // Return a 204 status code for preflight requests
}));


//routes
app.use("/api/User",UserPath)
app.use("/api/Task",TaskPath)




// Error handler Middleware
app.use(errors.NotFound);
app.use(errors.errorhandler);

//Running the server
const Port = process.env.Port || 8000; 
const server = app.listen(Port , () => console.log(`server is runing ${Port}`))