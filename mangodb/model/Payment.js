import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    user: {
        type: Array,
        default: []
    },
    data: {
        type: Array,
        default: []
    },
    product: {
        type: Array,
        default: []
    },
    isDelivered: {
        type: Boolean,
        default: false        
    }
})

export default mongoose.model('Payment', paymentSchema);
