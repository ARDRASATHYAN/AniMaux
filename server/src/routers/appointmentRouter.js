const express = require('express');

const mongoose = require('mongoose');
const appointModel = require('../models/appointmentModel');


const appointmentRouter = express.Router();

appointmentRouter.post('/appoint',async function(req,res){
    console.log('hello');
    try{

    const appoint = {
      
       
        user_id:req.body.user_id,
        pet_id:req.body.slotId,
            pet_name:req.body.pet_name,
       
            breed:req.body.breed,
            age:req.body.age,
          
            date:req.body.date,
            time:req.body.time,
           
            gender:req.body.gender,
         
            Category:req.body.Category,
        
          
        
        }
        console.log(appoint);
         const datas = await appointModel(appoint).save()
        
        if(datas){
           
            return res.status(200).json({
                success:true,
                error:false,
                massege:"appoint completed",
                data:datas,
            })
        }
        
    }catch{
        return res.status(200).json({
            success:false,
            error:true,
            massege:"something wrong",
           
        })
        
    }
})

appointmentRouter.get('/appoint', async function (req, res) {
    try {
       
        const user = await appointModel.find().populate('user_id')
            

        if (user[0]!=undefined) {
            return res.status(200).json({
                success: true,
                error: false,
                data: user,
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
appointmentRouter.get('/appoint/:id', async function (req, res) {
    try {
       const id=req.params._id
        const user = await appointModel.find(_id=id).populate('user_id')
            

        if (user[0]!=undefined) {
            return res.status(200).json({
                success: true,
                error: false,
                data: user,
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

// Define the route to update appointment status
appointmentRouter.put('/appoint/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const appointment = await appointModel.findByIdAndUpdate(id, { status: status }, { new: true });
  
      if (!appointment) {
        return res.status(404).json({ success: false, message: 'Appointment not found' });
      }
  
      res.json({ success: true, data: appointment });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

module.exports = appointmentRouter; 