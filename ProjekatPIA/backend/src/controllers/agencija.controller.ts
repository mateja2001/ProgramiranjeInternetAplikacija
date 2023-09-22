import express from 'express'
import KorisnikModel from '../models/korisnik'
import ObjekatModel from '../models/objekat'
import PosaoModel from '../models/posao'
import ZaposleniModel from '../models/zaposleni'
import RadnikModel from '../models/radnik'
import ZahtevModel from '../models/zahtev'
export class AgencijaController{
    azurirajPodatke=(req:express.Request,res:express.Response)=>{
        let korisnik=req.body.korisnik;
        let adresa=req.body.adresa;
        let naziv=req.body.naziv;
        let opis=req.body.opis;
        let mejl=req.body.mejl;
        let telefon=req.body.telefon;
        KorisnikModel.updateOne({'korisnickoIme':korisnik},{$set:{'nazivAgencije':naziv,'adresaAgencije':adresa,'opisAgencije':opis,'telefon':telefon,'mejl':mejl}},(err,resp)=>{
            if(err) console.log(err)
            else{
                res.json({'message':'ok'});
            }
        })
    }
    azurirajPodatkeISliku=(req:express.Request,res:express.Response)=>{
        let korisnik=req.body.korisnik;
        let adresa=req.body.adresa;
        let naziv=req.body.naziv;
        let opis=req.body.opis;
        let mejl=req.body.mejl;
        let telefon=req.body.telefon;
        let slika=req.body.slika
        KorisnikModel.updateOne({'korisnickoIme':korisnik},{$set:{'slika':slika,'nazivAgencije':naziv,'adresaAgencije':adresa,'opisAgencije':opis,'telefon':telefon,'mejl':mejl}},(err,resp)=>{
            if(err) console.log(err)
            else{
                res.json({'message':'ok'});
            }
        })
    }
    dohvatiPoslove=(req:express.Request,res:express.Response)=>{
        PosaoModel.find({'agencija':req.body.agencija},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json(resp);
            }
        })
    }
    dohvatiObjekat=(req:express.Request,res:express.Response)=>{
        ObjekatModel.findOne({'_id':req.body.id},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json(resp);
            }
        })
    }
    dohvatiKorisnika=(req:express.Request,res:express.Response)=>{
        KorisnikModel.findOne({'korisnickoIme':req.body.korIme},(err,resp)=>{
            if(err) console.log(err)
            else{
                res.json(resp);
            }
        })
    }
    dohvatiKorisnike=(req:express.Request,res:express.Response)=>{
        KorisnikModel.find({},(err,resp)=>{
            if(err) console.log(err)
            else{
                res.json(resp);
            }
        })
    }
    dohvatiObjekte=(req:express.Request,res:express.Response)=>{
        ObjekatModel.find({},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json(resp);
            }
        })
    }
    odbijZahtev=(req:express.Request,res:express.Response)=>{
        PosaoModel.updateOne({'_id':req.body.id},{$set:{'prihvacen':false}},(err,resp)=>{
            if(err) console.log(err);
            else{
                ObjekatModel.updateOne({'_id':req.body.idO},{$set:{'renoviranje':false}},(err,resp)=>{
                    if(err) console.log(err);
                    else{
                        res.json({'message':'ok'});
                    }
                })
            }
        })
    }
    prihvatiZahtev=(req:express.Request,res:express.Response)=>{
        PosaoModel.updateOne({'_id':req.body.id},{$set:{'ponuda':req.body.ponuda}},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'});
            }
        })
    }
    dohvZaposlene=(req:express.Request,res:express.Response)=>{
        ZaposleniModel.findOne({'agencija':req.body.agencija},(err,resp)=>{
            if(err)console.log(err);
            else{
                res.json(resp);
            }
        })
    }
    dodeliRadnike=(req:express.Request,res:express.Response)=>{
        ZaposleniModel.updateOne({'agencija':req.body.agencija},{$set:{'brojRadnika':req.body.preostaliRad}},(err,resp)=>{
            if(err) console.log(err);
            else{
                PosaoModel.updateOne({'_id':req.body.idPosla},{$set:{'brojRadnika':req.body.radnici}},(err,resp)=>{
                    if(err) console.log(err);
                    else{
                        res.json({'message':'ok'});
                    }
                })
            }
        })
    }
    dohvatiPosao=(req:express.Request,res:express.Response)=>{
        PosaoModel.findOne({'_id':req.body.idPosla},(err,resp)=>{
            if(err)console.log(err)
            else{
                res.json(resp);
            }
        })
    }
    izmeniObjekat=(req:express.Request,res:express.Response)=>{
        let _id=req.body.objekat._id;
        let prostorije=req.body.objekat.prostorije
        ObjekatModel.updateOne({'_id':_id},{$set:{'prostorije':prostorije}},(err,resp)=>{
            if(err)console.log(err);
            else{
                res.json({'message':'ok'});
            }
        })
    }
    oslobodiRadnike=(req:express.Request,res:express.Response)=>{
        ZaposleniModel.updateOne({'agencija':req.body.agencija},{$inc:{'brojRadnika':req.body.brojZauzetih}},(err,resp)=>{
            if(err) console.log(err);
            else{
                PosaoModel.updateOne({'_id':req.body.idPosla},{$set:{'brojRadnika':null}},(err,resp)=>{
                    if(err) console.log(err);
                    else{
                        RadnikModel.updateMany({'objekat':req.body.objekat},{$set:{'objekat':null}},(err,resp)=>{
                            if(err) console.log(err);
                            else{
                                res.json({'message':'ok'})
                            }
                        })
                    }
                })
            }
        })
    }
    dohvatiRadnike=(req:express.Request,res:express.Response)=>{
        RadnikModel.find({'agencija':req.body.agencija},(err,resp)=>{
            if(err) console.log(err)
            else{
                res.json(resp);
            }
        })
    }
    obrisiRadnika=(req:express.Request,res:express.Response)=>{
        RadnikModel.deleteOne({'_id':req.body.id},(err,resp)=>{
            if(err) console.log(err);
            else{
                //necemo smanjivati broj radnih mesta
                ZaposleniModel.updateOne({'agencija':req.body.agencija},{$inc:{'brojRadnika':-1,'brojZaposlenih':-1}},(err,resp)=>{
                    if(err) console.log(err);
                    else{
                        res.json({'message':'ok'});
                    }
                })
            }
        })
    }
    azurirajRadnika=(req:express.Request,res:express.Response)=>{
        let id=req.body.radnik._id;
        let ime=req.body.radnik.ime;
        let prezime=req.body.radnik.prezime;
        let mejl=req.body.radnik.mejl;
        let telefon=req.body.radnik.telefon;
        let strucnost=req.body.radnik.strucnost;
        RadnikModel.updateOne({'_id':id},{$set:{'ime':ime,'prezime':prezime,'mejl':mejl,'telefon':telefon,'strucnost':strucnost}}, (err,resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'});
            }
        })
    }
    dodajRadnike=(req:express.Request,res:express.Response)=>{
        //agencija prethodno ima vec zaposlenih, kad agencija dodaje radnike, ne povecava broj radnih mesta
        ZaposleniModel.updateOne({'agencija':req.body.agencija},{$inc:{'brojRadnika':1,'brojZaposlenih':1}},(err,resp)=>{
            if(err) console.log(err);
            else{
                let rad=new RadnikModel({
                    ime:req.body.radnik.ime,
                    prezime:req.body.radnik.prezime,
                    mejl:req.body.radnik.mejl,
                    telefon:req.body.radnik.telefon,
                    strucnost:req.body.radnik.strucnost,
                    agencija:req.body.radnik.agencija,
                    objekat:null
                })
                rad.save((err,respp)=>{
                    if(err) console.log(err);
                    else{
                        res.json({'message':'ok'})
                    }
                })
            }
        })    
    }
    dohvatiSlobodneRadnike=(req:express.Request,res:express.Response)=>{
        RadnikModel.find({'agencija':req.body.agencija,'objekat':null},(err,resp)=>{
            if(err) console.log(err)
            else{
                res.json(resp);
            }
        })
    }
    uposliRadnika=(req:express.Request,res:express.Response)=>{
        RadnikModel.updateOne({'_id':req.body.idRadnika},{$set:{'objekat':req.body.objekat}},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }
    zahtevRadnaMesta=(req:express.Request,res:express.Response)=>{
        let zah=new ZahtevModel({
            agencija:req.body.agencija,
            brojMesta:req.body.brojMesta
        })
        zah.save((err,resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }
    dohvatiZahtev=(req:express.Request,res:express.Response)=>{
        ZahtevModel.findOne({'agencija':req.body.agencija},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json(resp);
            }
        })
    }


}

