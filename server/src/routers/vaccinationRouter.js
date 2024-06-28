const express = require('express');

const mongoose = require('mongoose');


const priscriptionModel = require('../models/prescriptionModel');
const vaccineModel = require('../models/vaccinateModel');


const vaccinationRouter = express.Router();

vaccinationRouter.post('/vaccine', async function (req, res) {
    try {
      const newPrescription = {
        doctor_id: req.body.doctor_id,
        appoint_id: req.body.appoint_id,
        pet_id:req.body.pet_id,
        user_id:req.body.user_id,
       date: req.body.date,
       type: req.body.type,
       brand: req.body.brand,
       batchno: req.body.batchno,
      nextdate: req.body.nextdate,
        status: 0
      };
  
      console.log('New Prescription:', newPrescription);
  
      const savedPrescription = await vaccineModel(newPrescription).save();
  
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


 vaccinationRouter.get('/viewvaccine/:id', async function (req, res) {
    try {
       const id=req.params.id
        const user = await vaccineModel.find({pet_id:id}).populate('doctor_id').populate('appoint_id').populate({
          path: 'appoint_id',
          populate: {
              path: 'user_id',
              model: 'userreg_tb' // Adjust the model name as per your project
          }
      });
            

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


vaccinationRouter.get('/viewvaccines/:id', async function (req, res) {
  try {
     const id=req.params.id
      const user = await vaccineModel.find({appoint_id:id}).populate('doctor_id').populate('appoint_id').populate({
        path: 'appoint_id',
        populate: {
            path: 'user_id',
            model: 'userreg_tb' // Adjust the model name as per your project
        }
    });
          

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


module.exports =vaccinationRouter; 