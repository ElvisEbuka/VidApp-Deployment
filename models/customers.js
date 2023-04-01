const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a name"]
    },

    isGold: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: String,
        required: [true, "please provide a phone number"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
},
    {timestamp: true}

)

CustomerSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

CustomerSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

const Customer = mongoose.model('customer', CustomerSchema)
module.exports = Customer