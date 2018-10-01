'use strict'

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyparser from 'body-parser'
import path from 'path'
import * as Promise from 'bluebird'

import router from './router'

// import { Purchases, Recommendations, Users } from './dbData'
import { LatePlate } from './models/'


const MONGO_URL = 'mongodb://admin:columbae1@ds115472.mlab.com:15472/columbapi'
const portNo = 3000

// Create express app
const app = express()

// Connect to mongodb
// user - admin
// pass - columbae1
mongoose.connect(MONGO_URL)


mongoose.connection.on('open', () => {
    let db = mongoose.connection.db
    LatePlate.model.deleteMany({})
    .then(() => {
        LatePlate.model({ name: 'Michael' }).save()
        LatePlate.model({ name: 'Emily' }).save()
        LatePlate.model({ name: 'Ben' }).save()
    })

    
    // db.createCollection('latePlates')
    // .then(() => {
    //     console.log('db: ', db.databaseName)
    //     db.latePlates.insert(
    //         {
    //           name: 'Michael'
    //         },
    //         function (err, res) {
    //           if (err) {
    //             db.close();
    //             return console.log(err);
    //           }
    //         }
    //     )
    // })
    // .catch(err => {
    //     console.error('An error occurred while creating the late plates collection: ', err)
    // })

})


mongoose.connection.on('error',  err => {
    if (err) {
        console.log('Failed to connect to database.')
    }
})

// Load middlewares
app.use(cors())
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', router)


// Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
});

// Send basic response
app.get('/', (req, res) => {
    res.send('foobar')
})

// Start server
app.listen(portNo, () => {
    console.log('Server is running on port ' + portNo)
})