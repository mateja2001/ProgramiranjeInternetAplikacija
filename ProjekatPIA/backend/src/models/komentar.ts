import mongoose from "mongoose";

const Schema=mongoose.Schema;

let Komentar=new Schema({
    agencija:{
        type:String
    },
    klijent:{
        type:String
    },
    idPosla:{
        type:String
    },
    komentar:{
        type:String
    },
    ocena:{
        type:Number
    }

})
export default mongoose.model('KomentarModel',Komentar,'komentari');