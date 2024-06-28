const mongoose=require('mongoose')

const schema=mongoose.Schema


const serviceSchema = new schema({
   
   services:{type:String},
   description :{type:String},
   

})
const serviceModel = mongoose.model('service_tb',serviceSchema)

module.exports = serviceModel