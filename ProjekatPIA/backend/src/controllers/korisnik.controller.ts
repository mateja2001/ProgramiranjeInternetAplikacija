import express from 'express'
import KorisnikModel from '../models/korisnik'
import KomentarModel from '../models/komentar'

export class KorisnikController{
    login=(req:express.Request,res:express.Response)=>{
        let korIme=req.body.korIme;
        let lozinka=req.body.lozinka;
        KorisnikModel.findOne({'korisnickoIme':korIme,'lozinka':lozinka},(err,kor)=>{
            if(err) console.log(err);
            else{
                res.json(kor);
            }
        })
    }
    dohvSveKorisnike=(req:express.Request,res:express.Response)=>{
        KorisnikModel.find({},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json(resp);
            }
        })
    }
    registracijaKorisnika=(req:express.Request,res:express.Response)=>{
       if(req.body.tip=='agencija'){
        let korisnik=new KorisnikModel({
            korisnickoIme:req.body.korisnickoIme,
            lozinka:req.body.lozinka,
            telefon:req.body.telefon,
            mejl:req.body.mejl,
            tip:req.body.tip,
            odobren:false,
            ime:null,
            prezime:null,
            nazivAgencije:req.body.nazivAgencije,
            adresaAgencije:req.body.adresaAgencije,
            maticniBrAgencije:req.body.maticniBrAgencije,
            opisAgencije:req.body.opisAgencije,
            slika:req.body.slika,
            odbijen:false
        })
        korisnik.save((err,resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'});
            }
        })
       }
       else{
         let korisnik=new KorisnikModel({
            korisnickoIme:req.body.korisnickoIme,
            lozinka:req.body.lozinka,
            telefon:req.body.telefon,
            mejl:req.body.mejl,
            tip:req.body.tip,
            odobren:false,
            ime:req.body.ime,
            prezime:req.body.prezime,
            nazivAgencije:null,
            adresaAgencije:null,
            maticniBrAgencije:null,
            opisAgencije:null,
            slika:req.body.slika,
            odbijen:false
        })
        korisnik.save((err,resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'});
            }
        })
       }
    }
    pretraziAgencije=(req:express.Request,res:express.Response)=>{
        let naziv=req.body.naziv;
        let adresa=req.body.adresa;
        KorisnikModel.find({'nazivAgencije':{$regex:naziv},'adresaAgencije':{$regex:adresa}},(err,agen)=>{
            if(err) console.log(err);
            else{
                res.json(agen);
            }
        })
    }
    dohvatiKomentare=(req:express.Request,res:express.Response)=>{
        KomentarModel.find({'agencija':req.body.agencija},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json(resp);
            }
        })
    }
    promeniLozinku=(req:express.Request,res:express.Response)=>{
        KorisnikModel.updateOne({'korisnickoIme':req.body.korisnik},{$set:{'lozinka':req.body.novaLozinka}},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'});
            }
        })
    }
    dohvKorisnika=(req:express.Request,res:express.Response)=>{
        KorisnikModel.findOne({'korisnickoIme':req.body.korisnik},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json(resp);
            }
        })
    }
}