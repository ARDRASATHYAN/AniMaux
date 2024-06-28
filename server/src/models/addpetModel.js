const mongoose=require('mongoose')

const schema=mongoose.Schema

const petschema =new schema({
   user_id:{type:mongoose.Types.ObjectId,ref:"userreg_tb"},
   Category:{type:String},
   pet_name:{type:String},
   breed:{type:String},
   age:{type:String},
   weight:{type:String},
   height:{type:String},
   dob:{type:String},
   date_of_adopt:{type:String},
   gender:{type:String},
   photo:{type:String},
   color:{type:String},
   gender:{type:String},
   medical_histroy:{type:String},
})
const addpetModel = mongoose . model('pet_tb',petschema)

module.exports = addpetModel