
const mongoose=require('mongoose')

const schema=mongoose.Schema


const userregSchema = new schema({
    login_id:{type:mongoose.Types.ObjectId,ref:'login_tb'},
    pet_id:{type:mongoose.Types.ObjectId,ref:'pet_tb'},
    u_name:{type:String},
    u_email :{type:String},
    u_phone :{type:String},
    photo:{type:String},
    address:{type:String},

})
const userregModel = mongoose.model('userreg_tb',userregSchema)

module.exports = userregModel