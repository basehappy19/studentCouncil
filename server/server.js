const express = require('express')
const { readdirSync } = require('fs')
const morgan = require('morgan')
const cors = require('cors')
const bodyParse = require('body-parser')
const jsonwebtoken = require('jsonwebtoken')
const conn = require('./Config/Database')
require('dotenv').config()
const port = process.env.PORT || 9000;

const app = express();

conn()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParse.json({limit:'10mb'}))
app.use('/uploads', express.static('Uploads'))

readdirSync('./Routes').map((r) => app.use('/api', require('./Routes/'+r)))

app.listen(port,()=> console.log('Server Is Runing On Port '+ port))