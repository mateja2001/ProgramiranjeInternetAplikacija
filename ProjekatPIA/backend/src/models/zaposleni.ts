import mongoose from "mongoose";

const Schema=mongoose.Schema;

let Zaposleni=new Schema({
    agencija:{
        type:String
    },
    brojRadnika:{
        type:Number
    },
    brojZaposlenih:{
        type:Number
    },
    brojRadnihMesta:{
        type:Number
    }
})
export default mongoose.model('ZaposleniModel',Zaposleni,'zaposleni');