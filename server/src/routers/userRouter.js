const express = require('express')
const userregModel = require('../models/userregModel')



const userRouter = express.Router()

userRouter.get('/viewuser', async function (req, res) {
    try {
        const service= await userregModel.find()
        if (service[0]!=undefined) {
            return res.status(200).json({
                success: false,
                error: true,
                data: service,
            })
        }
        else{
            return res.status(400).json({
                success: false,
                error: true,
                message: "no data found",
            })
        }

    } catch {
        return res.status(400).json({
            success: false,
            error: true,
            message: "Something went wrong",
        })
    }

})
module.exports =userRouter