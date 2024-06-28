const express = require('express');

const mongoose = require('mongoose');


const priscriptionModel = require('../models/prescriptionModel');


const priscriptionRouter = express.Router();

priscriptionRouter.post('/prescription', async function (req, res) {
    try {
      const newPrescription = {
        doctor_id: req.body.doctor_id,
        appoint_id: req.body.appoint_id,
        pet_id:req.body.pet_id,
        user_id:req.body.user_id,
        prescriptions: req.body.prescriptions,
        status: 0
      };
  
      console.log('New Prescription:', newPrescription);
  
      const savedPrescription = await priscriptionModel(newPrescription).save();
  
      if (savedPrescription) {
        return res.status(200).json({
          success: true,
          error: false,
          message: "Prescription saved successfully",
          data: savedPrescription,
        });
      }
    } catch (err) {
      console.error('Error saving prescription:', err);
      return res.status(500).json({
        success: false,
        error: true,
        message: "Something went wrong",
      });
    }
  });


  priscriptionRouter.get('/prescriptions/:id', async function (req, res) {
    try {
       const id=req.params.id
        const user = await priscriptionModel.find({ pet_id: id }).populate('doctor_id').populate('appoint_id')
            

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

priscriptionRouter.get('/prescription/:id', async function (req, res) {
  try {
     const id=req.params.id
      const user = await priscriptionModel.find({appoint_id: id }).populate('doctor_id').populate('appoint_id').populate('pet_id')
          

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


module.exports = priscriptionRouter; 