import mongoose from "mongoose";

const Schema=mongoose.Schema;

let Objekat=new Schema({
    korisnik:{
        type:String
    },
    tip:{
        type:String
    },
    adresa:{
        type:String
    },
    brojProstorija:{
        type:Number
    },
    kvadratura:{
        type:Number
    },
    renoviranje:{
        type:Boolean
    },
    prostorije:{
        type:[{
            xKoord:{
                type:Number
            },
            yKoord:{
                type:Number
            },
            duzina:{
                type:Number
            },
            sirina:{
                type:Number
            },
            xVrata:{
                type:Number
            },
            yVrata:{
                type:Number
            },
            status:{
                type:String
            }
        }]
    }


})
export default mongoose.model('ObjekatModel',Objekat,'objekti');