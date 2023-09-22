import mongoose from "mongoose";

const Schema=mongoose.Schema;

let Radnik=new Schema({
    ime:{
        type:String
    },
    prezime:{
        type:String
    },
    mejl:{
        type:String
    },
    telefon:{
        type:String
    },
    strucnost:{
        type:String
    },
    agencija:{
        type:String
    },
    objekat:{
        type:String
    }
})
export default mongoose.model('RadnikModel',Radnik,'radnici');