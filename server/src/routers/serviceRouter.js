const express = require('express')
const serviceModel = require('../models/serviceModel')
const docteravaliableModel = require('../models/docteravaliableModel')
const serviceRouter = express.Router()



serviceRouter.post('/service',async function(req,res){
    try{
       
       const service= {
          
           
            
        services:req.body.services,
        description:req.body.description,
           

        }
        const datas = await serviceModel(service).save()
       
        if(datas){
           
            return res.status(200).json({
                success:true,
                error:false,
                massege:"add completed",
                data:datas,
            })
        }
    }catch{

        return res.status(400).json({
            success:false,
            error:true,
            message:"something went wrong",
            
        })
    }
})
serviceRouter.get('/viewservices', async function (req, res) {
    try {
        const service= await serviceModel.find()
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
serviceRouter.get('/viewservices', async function (req, res) {
    try {
        const service= await serviceModel.find()
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


serviceRouter.get('/view-slot', async function (req, res) {
    try {
        const vaccine = await docteravaliableModel.aggregate([
            {
                '$lookup': {
                    'from': 'docreg_tbs',
                    'localField': 'doctor_id',
                    'foreignField': 'login_id',
                    'as': 'doctor'
                }
            },
            {
                '$unwind': '$doctor'
            },
            {
                '$group': {
                    '_id': '$_id',
                    'D_first_name': { '$first': '$doctor.D_first_name' },
                    'D_last_name': { '$first': '$doctor.D_last_name' },
                    'photo': { '$first': '$doctor.photo' },
                    'date': { '$first': '$date' },
                    'start_time': { '$first': '$start_time' },
                    'end_time': { '$first': '$end_time' },
                    'profile': { '$first': '$photo' },
                    'slot_no': { '$first': '$slot_no' }
                }
            }
        ]);

        if (vaccine && vaccine.length > 0) {
            return res.status(200).json({
                success: true,
                error: false,
                data: vaccine
            });
        } else {
            return res.status(404).json({
                success: false,
                error: true,
                message: "No data found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Something went wrong",
            details: error.message // Optional: Provide error details for debugging
        });
    }
});
module.exports =serviceRouter