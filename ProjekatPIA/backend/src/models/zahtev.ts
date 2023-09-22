import mongoose from "mongoose";

const Schema=mongoose.Schema;

let Zahtev=new Schema({
    agencija:{
        type:String
    },
    brojMesta:{
        type:Number
    }
})
export default mongoose.model('ZahtevModel',Zahtev,'zahtevi');