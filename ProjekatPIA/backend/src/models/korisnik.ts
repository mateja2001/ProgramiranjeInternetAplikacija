import mongoose from "mongoose";

const Schema=mongoose.Schema;

let Korisnik=new Schema({
    korisnickoIme:{
        type:String
    },
    lozinka:{
        type:String
    },
    telefon:{
        type:String
    },
    mejl:{
        type:String
    },
    tip:{
        type:String
    },
    odobren:{
        type:Boolean
    },
    ime:{
        type:String
    },
    prezime:{
        type:String
    },
    nazivAgencije:{
        type:String
    },
    adresaAgencije:{
        type:String
    },
    maticniBrAgencije:{
        type:String
    },
    opisAgencije:{
        type:String
    },
    slika:{
        type:String
    },
    odbijen:{
        type:Boolean
    }
})

export default mongoose.model('KorisnikModel',Korisnik,'korisnici');