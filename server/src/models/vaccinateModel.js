const mongoose=require('mongoose')

const schema=mongoose.Schema

const vaccineschema =new schema({
   doctor_id:{type:mongoose.Types.ObjectId,ref:"docreg_tb"},
   user_id:{type:mongoose.Types.ObjectId,ref:"userreg_tb"},
   pet_id:{type:mongoose.Types.ObjectId,ref:"pet_tb"},
   appoint_id: { type: mongoose.Types.ObjectId, ref: 'appoint_tb' },
   date:{ type: Date, default: Date.now },
   type:{type:String},
   brand:{type:String}, 
   batchno:{type:String}, 
   nextdate:{ type: Date }, 
 
  
   
})
const vaccineModel = mongoose.model('vaccine',vaccineschema )

module.exports = vaccineModel