const mongoose =require('mongoose');
const {Schema,model} = mongoose;

const bookingSchema = new Schema({
    // ref means name of model which we want to refer
    place:{type:mongoose.Schema.Types.ObjectId,required :true,ref:'Place'},
    user:{type:mongoose.Schema.Types.ObjectId,required :true},
    checkIn:{type:Date, required: true},
    checkOut:{type:Date, required: true},
    name:{type:String, required: true},
    numberOfGuest:Number,
    phone:{type:String, required: true},
    price:Number,
});

const BookingModel =  model("Booking",bookingSchema);
module.exports = BookingModel;