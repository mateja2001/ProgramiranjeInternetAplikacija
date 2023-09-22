import mongoose from "mongoose";

const Schema=mongoose.Schema;

let Posao=new Schema({
    korisnik:{
        type:String
    },
    agencija:{
        type:String
    },
    objekat:{
        type:String //predstavlja _id objekta
    },
    prihvacen:{
        type:Boolean
    },
    datumPocetka:{
        type:String
    },
    datumKraja:{
        type:String
    },
    status:{
        type:String
    },
    placeno:{
        type:Boolean
    },
    ponuda:{
        type:Number
    },
    razlogOtkazivanja:{
        type:String
    },
    brojRadnika:{
        type:Number
    }
})

export default mongoose.model('PosaoModel',Posao,'poslovi');