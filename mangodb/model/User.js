import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    address:{
        type: String,
        default: "No address on file"
    },
    zipcode:{
        type: Number,
        min: 5,
        default: null
    },
    phoneNumber:{
        type: Number,
        min: 10,
        default: null
    },


    date: {
        type: Date,
        default: Date.now
    },
     userType: {
        type: Number,
        required: true
        //1 = customer
        //2 = delivery person
        //3 = admin
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    }
});

export default mongoose.model('User', userSchema);
