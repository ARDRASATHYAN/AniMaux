const express = require('express');
const bcrypt = require('bcryptjs');
const loginModel = require('../models/loginModel');
const userregModel = require('../models/userregModel');
const docregModel = require('../models/docregModel');




const registerRouter = express.Router()








registerRouter.post('/userreg',async function(req,res){
    try{
        console.log(req.body.username);
        const oldUser =await loginModel.findOne({username:req.body.username })
        console.log(oldUser);
        if(oldUser){
            return res.status(400).json({
                success:false,
                error:true,
                mesage:"Username already exist",
            })
        }
        const oldPhone =await userregModel.findOne({u_phone:req.body.u_phone })
        if(oldPhone){
            return res.status(400).json({
                success:false,
                error:true,
                mesage:"Phone number already exist",
            })
        }
        const hashedpass = await bcrypt.hash(req.body.password,12)
        const login={
            password:hashedpass,
            username:req.body.username,           
            role:1,
            status:0,
        }

        const login_data = await loginModel(login).save()


        const userreg = {
            pet_id:req.body.pet_id,
            login_id:login_data._id,
            u_name :req.body.u_name,
            u_email :req.body.u_email,
            u_phone :req.body.u_phone,  
            photo:req.body.photo,   
            address:req.body.address,     

        }
        const datas = await userregModel(userreg).save()
        if(datas){
            return res.status(200).json({
                success:true,
                error:false,
                massege:"registeration completed",
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

registerRouter.post('/doctreg', async function(req, res) {
    try {
        console.log("data===>", req.body);
        const oldUser = await docregModel.findOne({ username: req.body.username });
       
        if (oldUser) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Username already exists",
            });
        }
        
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const login = {
            password: hashedPassword,
            username: req.body.username,
            role: 2,
            status: 0,
        };
        
        const loginData = await loginModel.create(login);
        
        const doctreg = {
            login_id: loginData._id,
            D_first_name: req.body.D_first_name,
            D_last_name: req.body.D_last_name,
            D_email: req.body.D_email,
            D_phone: req.body.D_phone,
            D_certificate: req.body.D_certificate,
            D_experience: req.body.D_experience,
            D_qualification: req.body.D_qualification,
            photo: req.body.photo,  
        };

        const doctorData = await docregModel.create(doctreg);
        
        console.log('Inserted doctor data:', doctorData);
        
        return res.status(200).json({
            success: true,
            error: false,
            message: "Registration completed",
            data: doctorData,
        });
    } catch (error) {
        console.error('Error in doctor registration:', error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Something went wrong",
        });
    }
});

registerRouter.get('/listdoctor', async function (req, res) {
   
    try {
        
        const doc = await loginModel.aggregate(
            [
                {
                  '$lookup': {
                    'from': 'docreg_tbs', 
                    'localField': '_id', 
                    'foreignField': 'login_id', 
                    'as': 'user'
                  }
                 },
                 
                 {
                    "$unwind":"$user"
                },
                {
                    "$group":{
                        '_id':'$_id',
                        'login_id':{'$first':'$user.login_id'},
                        'D_first_name':{'$first':'$user.D_first_name'},
                        'D_last_name':{'$first':'$user.D_last_name'},
                        'D_email':{'$first':'$user.D_email'},
                        'D_phone':{'$first':'$user.D_phone'},
                        'D_experience':{'$first':'$user.D_experience'},
                        'D_certificate':{'$first':'$user.D_certificate'},
                        'D_qualification':{'$first':'$user.D_qualification'},

                        'photo':{'$first':'$user.photo'},
                        'status':{'$first':'$status'},

                    }
                }

              ]
        )
        if (doc[0]!=undefined) {
            return res.status(200).json({
                success: true,
                error: false,
                data: doc,
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

// registerRouter.post('/doctreg',async function(req,res){
//     try{
//         console.log("data===>",req.body);
//         const oldUser =await docregModel.findOne({username:req.body.username })
       
//         if(oldUser){
            
//             return res.status(400).json({
//                 success:false,
//                 error:true,
//                 mesage:"name already exist",
//             })
//         }
//         const hashedpass = await bcrypt.hash(req.body.password,12)
//         const login={
//             password:hashedpass,
//             username:req.body.username,
            
//             role:2,
//             status:0,
//         }
//         const login_data = await loginModel(login).save()
       


//         const doctreg = {
          
//             login_id:login_data._id,
//             D_first_name:req.body.D_first_name,
//             D_last_name:req.body.D_last_name,
//             D_email:req.body.D_email,
//             D_phone:req.body.D_phone,
//             D_certificate:req.body.D_certificate,
//             D_experience:req.body.D_experience,
//             D_qualification:req.body.D_qualification,
//             photo:req.body.photo,  
           

//         }
//         const datas = await docregModel(doctreg).save()
//        console.log('kkk',datas);
//         if(datas){
           
//             return res.status(200).json({
//                 success:true,
//                 error:false,
//                 massege:"registeration completed",
//                 data:datas,
//             })
//         }
//     }catch{

//         return res.status(400).json({
//             success:false,
//             error:true,
//             message:"something went wrong",
            
//         })
//     }
// })
// registerRouter.get('/listapproveddoctor', async function (req, res) {
   
//     try {
        
//         const doc = await loginModel.aggregate(
//             [
//                 {
//                   '$lookup': {
//                     'from': 'docreg_tbs', 
//                     'localField': '_id', 
//                     'foreignField': 'login_id', 
//                     'as': 'user'
//                   }
//                  },
                 
//                  {
//                     "$unwind":"$user"
//                 },
//                 {
//                     "$match":{
//                         'status':"1"
//                     }
//                 },
//                 {
//                     "$group":{
//                         '_id':'$_id',
//                         'doctor_id':{'$first':'$user._id'},
//                         'D_first_name':{'$first':'$user.D_first_name'},
//                         'D_last_name':{'$first':'$user.D_last_name'},
//                         'D_email':{'$first':'$user.D_email'},
//                         'D_phone':{'$first':'$user.D_phone'},
//                         'D_experience':{'$first':'$user.D_experience'},
//                         'D_certificate':{'$first':'$user.D_certificat'},
//                         'D_qualification':{'$first':'$user.D_qualification'},
//                         'photo':{'$first':'$user.photo'},

//                         'status':{'$first':'$status'},

//                     }
//                 }

//               ]
//         )
//         if (doc[0]!=undefined) {
//             return res.status(200).json({
//                 success: true,
//                 error: false,
//                 data: doc,
//             })
//         }
//         else{
//             return res.status(400).json({
//                 success: false,
//                 error: true,
//                 message: "no data found",
//             })
//         }

//     } catch {
//         return res.status(400).json({
//             success: false,
//             error: true,
//             message: "Something went wrong",
//         })
//     }

// })
// registerRouter.get('/listdoctor', async function (req, res) {
   
//     try {
        
//         const doc = await loginModel.aggregate(
//             [
//                 {
//                   '$lookup': {
//                     'from': 'docreg_tbs', 
//                     'localField': '_id', 
//                     'foreignField': 'login_id', 
//                     'as': 'user'
//                   }
//                  },
                 
//                  {
//                     "$unwind":"$user"
//                 },
//                 {
//                     "$group":{
//                         '_id':'$_id',
//                         'login_id':{'$first':'$user.login_id'},
//                         'D_first_name':{'$first':'$user.D_first_name'},
//                         'D_last_name':{'$first':'$user.D_last_name'},
//                         'D_email':{'$first':'$user.D_email'},
//                         'D_phone':{'$first':'$user.D_phone'},
//                         'D_experience':{'$first':'$user.D_experience'},
//                         'D_certificate':{'$first':'$user.D_certificate'},
//                         'D_qualification':{'$first':'$user.D_qualification'},

//                         'photo':{'$first':'$user.photo'},
//                         'status':{'$first':'$status'},

//                     }
//                 }

//               ]
//         )
//         if (doc[0]!=undefined) {
//             return res.status(200).json({
//                 success: true,
//                 error: false,
//                 data: doc,
//             })
//         }
//         else{
//             return res.status(400).json({
//                 success: false,
//                 error: true,
//                 message: "no data found",
//             })
//         }

//     } catch {
//         return res.status(400).json({
//             success: false,
//             error: true,
//             message: "Something went wrong",
//         })
//     }

// })
// registerRouter.get('/approvedoctor/:id',async function(req,res){
//     try{
//         const login_id=req.params.id
//         console.log(login_id);
//         const doctor=await loginModel.updateOne({_id:login_id},{$set:{status:1}})
//         console.log(doctor);
//         if(doctor.modifiedCount==1){
//             return res.status(200).json({
//                 success:true,
//                 error:false,
//                 message:'user approved'
//             })
//         }else{
//             return res.status(400).json({
//                 success:false,
//                 error:true,
//                 message:'no datfound',
//             })
//         }

//     }catch{
//         return res.status(400).json({
//             success:false,
//             error:true,
//             message:'something went wrong'
//         })
//     }
// })
// registerRouter.get('/rejectdoctor/:id',async function(req,res){
//     try{
//         const login_id=req.params.id
//         console.log(login_id);
//         const doctor=await loginModel.deleteOne({_id:login_id})
//         console.log(doctor);
//         if(doctor.deletedCount==1){
//             return res.status(200).json({
//                 success:true,
//                 error:false,
//                 message:'user approved'
//             })
//         }else{
//             return res.status(400).json({
//                 success:false,
//                 error:true,
//                 message:'no datfound',
//             })
//         }

//     }catch{
//         return res.status(400).json({
//             success:false,
//             error:true,
//             message:'something went wrong'
//         })
//     }
// })
// registerRouter.post('/pharmacyreg',async function(req,res){
//     try{
//         console.log("data===>",req.body);
//         const oldUser =await loginModel.findOne({username:req.body.username })
       
//         if(oldUser){
            
//             return res.status(400).json({
//                 success:false,
//                 error:true,
//                 mesage:"name already exist",
//             })
//         }
//         const hashedpass = await bcrypt.hash(req.body.password,12)
//         const login={
//             password:hashedpass,
//             username:req.body.username,
            
//             role:3,
//             status:0,
//         }
//         const login_data = await loginModel(login).save()
       


//         const pharmacyreg = {
          
//             login_id:login_data._id,
//             name:req.body.name,
//             // D_last_name:req.body.D_last_name,
//             email:req.body.email,
//             phone:req.body.phone,
//             // D_certificate:req.body.D_certificate,
//             experience:req.body.experience,
//             // D_qualification:req.body.D_qualification,
//             photo:req.body.photo,  
           

//         }
//         const datas = await pharmacyModel(pharmacyreg).save()
       
//         if(datas){
           
//             return res.status(200).json({
//                 success:true,
//                 error:false,
//                 massege:"registeration completed",
//                 data:datas,
//             })
//         }
//     }catch{

//         return res.status(400).json({
//             success:false,
//             error:true,
//             message:"something went wrong",
            
//         })
//     }
// })



module.exports = registerRouter