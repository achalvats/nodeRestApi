//To creeate REST API
const express = require('express')
const app = express()
//LOGGING TOOL
const logging = require('morgan');
//BODY PARSER, to parse sent data in body in JSON
const bodyParser = require('body-parser')
//mongo db 3rd party client
const mongoose = require('mongoose')
//TO API ROUTE for products and orders 
const productRouter = require('./api/routes/products')
const orderRouter = require('./api/routes/order')

//Connecting to db
mongoose.connect('mongodb+srv://'+process.env.Mongo_Atls_Username+':'+process.env.Mongo_Atls_Pw+'@restapp.akzhl.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

//handling CORS access for all domains
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "*"
    );
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", '*')
        return res.status(200).json({});
    }
    next();
});

app.use(logging('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routing to order and products
app.use('/products', productRouter);
app.use('/orders', orderRouter);

//Handling not found error
app.use((req, res, next) => {
    const error = new Error('Not Found!')
    error.status = 404;
    next(error);
})

//Handling all other errors except not found
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app;