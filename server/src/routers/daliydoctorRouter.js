const express = require('express');
const docteravaliableModel = require('../models/docteravaliableModel');
const mongoose = require('mongoose');
const docregModel = require('../models/docregModel');

const daliydocterRouter = express.Router();

// Define your route

daliydocterRouter.get('/listdocter', async function (req, res) {
    try {
       
        const user = await docregModel.find()
            

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

daliydocterRouter.post('/slot', async function(req, res) {
    try {
        console.log('lll', req.body);
        // Validate doctor_id
        if (!mongoose.isValidObjectId(req.body.doctor_id)) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Invalid doctor_id",
            });
        }
        console.log('id',req.body.doctor_id);
        const docteravaliable = {
            doctor_id: req.body.doctor_id,
            date: req.body.date,
            start_time: req.body.starttime,
            end_time: req.body.endtime,
        };
        
        const datas = await docteravaliableModel(docteravaliable).save();
        console.log('jjj', datas);
        if (datas) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "add completed",
                data: datas,
            });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(400).json({
            success: false,
            error: true,
            message: "something went wrong",
        });
    }
});


daliydocterRouter.delete('/delete-slot/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await docteravaliableModel.findByIdAndDelete(id);
      res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting schedule', error });
    }
  });

  daliydocterRouter.delete('/delete-doctor/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await docregModel.findByIdAndDelete(id);
      res.status(200).json({ message: 'doctor deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting doctor', error });
    }
  });

module.exports = daliydocterRouter; // Export the router once
