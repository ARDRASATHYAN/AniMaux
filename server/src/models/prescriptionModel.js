const mongoose=require('mongoose')

const schema=mongoose.Schema


const prescriptionSchema = new schema({
  doctor_id: { type: mongoose.Types.ObjectId, ref: 'docreg_tb' },
  appoint_id: { type: mongoose.Types.ObjectId, ref: 'appoint_tb' },
  pet_id:{type:mongoose.Types.ObjectId,ref:"pet_tb"},
  user_id:{type:mongoose.Types.ObjectId,ref:"userreg_tb"},
  prescriptions: [
    {
      prescription: { type: String },
      times: { type: String },
      days: { type: String }
    }
  ]
});

const prescriptionModel = mongoose.model('prescription_tb', prescriptionSchema);

module.exports = prescriptionModel