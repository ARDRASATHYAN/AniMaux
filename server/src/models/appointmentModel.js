const mongoose=require('mongoose')

const schema=mongoose.Schema

const appointschema = new schema({
    user_id:{type:mongoose.Types.ObjectId,ref:"userreg_tb"},
    pet_id:{type:mongoose.Types.ObjectId,ref:"pet_tb"},
    pet_name:{type:String},
  
    
    Category:{type:String},
    breed:{type:String},
    age:{type:String},
   
    date: { type: Date, default: Date.now },
    time: { type: String, default: () => new Date().toLocaleTimeString() },
   gender:{type:String},
   status:{type:String ,default:'pending'}
})
const appointModel = mongoose . model('appoint_tb',appointschema)

module.exports =appointModel