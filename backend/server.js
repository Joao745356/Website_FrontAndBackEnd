const mongoose = require("mongoose")
const express = require('express')
const app = express()
const expressLayouts =require ('express-ejs-layouts')
const path = require('path');
const uri = "mongodb+srv://paw-user:QVcIhujBFHVxntgm@cluster-paw.9apgagg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-PAW"
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const authController = require('./controllers/auth')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({limit: '10mb', extended:false}))
app.use(methodOverride('_method'))
app.use(cookieParser());
app.use(express.json())
app.use(cors())



async function connect(){
    try{
        await mongoose.connect(uri)
        console.log("connected to mongoDB!")
    }catch(error){
        console.error(error);
    }
}

//imports
const authRouter = require('./routes/auth')
const adminRouter = require('./routes/admin/admin')
const staffRouter = require('./routes/staff/staff')
const userApiRouter = require ('./routes/api/users')
const donationApiRouter = require('./routes/api/donations')
const authApiRouter = require ('./routes/api/auth')
const rewardsApiRouter = require ('./routes/api/rewards')


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'homepage.html'));
});

app.use('/login', authRouter);
app.use('/admin', authController.verifyLogin ,adminRouter)
app.use('/staff', authController.verifyLogin, staffRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/users', userApiRouter) //user manipulations
app.use('/api/auth', authApiRouter) //login + register
app.use('/api/donations', donationApiRouter) //donations
app.use('/api/rewards', rewardsApiRouter) //rewards



connect()

app.listen(process.env.PORT || 3000)