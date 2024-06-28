const mongoose=require('mongoose')

const schema=mongoose.Schema

const consultslotschema =new schema({
   doctor_id:{type:mongoose.Types.ObjectId,ref:"docreg_tb"},
   user_id:{type:mongoose.Types.ObjectId,ref:"userreg_tb"},

   date:{type:String},
   start_time:{type:String},
   end_time:{type:String}, 
 
  
   
})
const docteravaliableModel = mongoose.model('slot_tb',consultslotschema)

module.exports = docteravaliableModel
