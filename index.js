require('dotenv').config()
const express = require('express')
const cors = require('cors')

// initialize router
const router = require('./src/routes')

// port
const port = 8000
const app = express()

app.use(cors())

app.use(express.json())

// configuration router
app.use('/api/v1', router)

app.listen(port, ()=> console.log('Server running at port ', port))