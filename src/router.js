'use strict'

import express from 'express'
import moment from 'moment';

import { LatePlate } from './models/'


const router = express.Router()


router.get('/lateplates', (req, res) => {
    
    LatePlate.model.find({}, (err, lateplates) => {
        if (err) {
            res.status(400).json({ msg: "Unable to retrieve late plates." })
        }
        res.status(200).json(lateplates)
    })
})


export default router
