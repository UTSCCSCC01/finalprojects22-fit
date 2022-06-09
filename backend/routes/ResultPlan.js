const { application } = require('express')

const express = require('express'),
ResultPlan = express()

require('dotenv').config()
ResultPlan.set('view engine', 'ejs')
ResultPlan.use('/ResultPlan/',require('./routes/ResultPlan'))

const PORT = process.env.PORT || 3000

ResultPlan.listen(PORT, ()=> {
    const url = `http://localhost: ${PORT}`
    console.log(`Listening on ${url}`)
})