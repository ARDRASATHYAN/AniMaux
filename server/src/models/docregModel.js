const mongoose=require('mongoose')

const schema=mongoose.Schema



const docregschema = new schema({
    login_id: { type: mongoose.Types.ObjectId, ref: 'login_tb', required: true },
    D_first_name: { type: String, required: true },
    D_last_name: { type: String, required: true },
    D_email: { type: String, required: true },
    D_phone: { type: String, required: true },
    D_certificate: { type: String, required: true },
    D_experience: { type: String, required: true },
    D_qualification: { type: String, required: true },
    photo: { type: String, required: true },

})

const docregModel = mongoose . model('docreg_tb',docregschema)

module.exports =docregModel