import express from 'express'
import KorisnikModel from '../models/korisnik'
import ObjekatModel from '../models/objekat'
import PosaoModel from '../models/posao'
import KomentarModel from '../models/komentar'
import ZaposleniModel from '../models/zaposleni'
import RadnikModel from '../models/radnik'
export class KlijentController{
    azurirajPodatke=(req:express.Request,res:express.Response)=>{
        let korisnik=req.body.korisnik;
        let ime=req.body.ime;
        let prezime=req.body.prezime;
        let mejl=req.body.mejl;
        let telefon=req.body.telefon;
        KorisnikModel.updateOne({'korisnickoIme':korisnik},{$set:{'ime':ime,'prezime':prezime,'telefon':telefon,'mejl':mejl}},(err,resp)=>{
            if(err) console.log(err)
            else{
                res.json({'message':'ok'});
            }
        })
    }
    azurirajPodatkeISliku=(req:express.Request,res:express.Response)=>{
        let korisnik=req.body.korisnik;
        let ime=req.body.ime;
        let prezime=req.body.prezime;
        let mejl=req.body.mejl;
        let telefon=req.body.telefon;
        let slika=req.body.slika;
        KorisnikModel.updateOne({'korisnickoIme':korisnik},{$set:{'ime':ime,'prezime':prezime,'telefon':telefon,'mejl':mejl,'slika':slika}},(err,resp)=>{
            if(err) console.log(err)
            else{
                res.json({'message':'ok'});
            }
        })
    }
    dohvatiObjekte=(req:express.Request,res:express.Response)=>{
        let korisnik=req.body.korisnik;
        ObjekatModel.find({'korisnik':korisnik},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json(resp);
            }
        })

    }
    dodajObjekat=(req:express.Request,res:express.Response)=>{
        let objekat=new ObjekatModel({
            korisnik:req.body.objekat.korisnik,
            tip:req.body.objekat.tip,
            adresa:req.body.objekat.adresa,
            brojProstorija:req.body.objekat.brojProstorija,
            kvadratura:req.body.objekat.kvadratura,
            renoviranje:false,
            prostorije:req.body.objekat.prostorije,
        })
        objekat.save((err,resp)=>{
            if(err) console.log(err)
            else{
                res.json({'message':'ok'});
            }
        })
    }
    obrisiObjekat=(req:express.Request,res:express.Response)=>{
        ObjekatModel.deleteOne({'_id':req.body.id},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }
    izmeniObjekat=(req:express.Request,res:express.Response)=>{
        let _id=req.body.objekat._id;
        let tip=req.body.objekat.tip;
        let adresa=req.body.objekat.adresa;
        let brojProstorija=req.body.objekat.brojProstorija;
        let kvadratura=req.body.objekat.kvadratura;
        let prostorije=req.body.objekat.prostorije
        ObjekatModel.updateOne({'_id':_id},{$set:{'tip':tip,'adresa':adresa,'brojProstorija':brojProstorija,'kvadratura':kvadratura,'prostorije':prostorije}},(err,resp)=>{
            if(err)console.log(err);
            else{
                res.json({'message':'ok'});
            }
        })
    }
    dohvatiSveAgencije=(req:express.Request,res:express.Response)=>{
        KorisnikModel.find({'tip':'agencija','odobren':true},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json(resp);
            }
        })
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
    dohvatiObjekteZaRenoviranje=(req:express.Request,res:express.Response)=>{
        let korisnik=req.body.korisnik;
        ObjekatModel.find({'korisnik':korisnik, 'renoviranje':false},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json(resp);
            }
        })
    }
    zahtevZaSaradnjom=(req:express.Request,res:express.Response)=>{
        let posao=new PosaoModel({
            korisnik:req.body.korisnik,
            objekat:req.body.objekat,
            agencija:req.body.agencija,
            datumPocetka:req.body.datumPocetka,
            datumKraja:req.body.datumKraja,
            prihvacen:null,
            status:'zahtev',
            placeno:false,
            ponuda:null,
            razlogOtkazivanja:null,
            brojRadnika:null
        });
        posao.save((err,resp)=>{
            if(err) console.log(err);
            else{
                ObjekatModel.updateOne({'_id':req.body.objekat},{$set:{'renoviranje':true}},(err,rsp)=>{
                    if(err) console.log(err);
                    else{
                        res.json({'message':'ok'});
                    }
                })
            }
        })
    }
    dohvatiPosloveKlijenta=(req:express.Request,res:express.Response)=>{
        PosaoModel.find({'korisnik':req.body.korisnik},(err,resp)=>{
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
    //potencijalno po zavrsetku posla treba da vratimo radnike(-> ili to moze kad agencija zavrsi)
    platiPosao=(req:express.Request,res:express.Response)=>{
        let idO=req.body.id;
        ObjekatModel.updateOne({'_id':idO},{$set:{'renoviranje':false}},(err,resp)=>{
            if(err) console.log(err)
            else{
                PosaoModel.findOne({'objekat':idO,'status':'aktivan'},(err,posao)=>{
                    if(err) console.log(err);
                    else{
                        if(posao['brojRadnika']==null){
                            //agencija je vec oslobodila radnike
                            PosaoModel.updateOne({'objekat':idO,'status':'aktivan'},{$set:{'status':'zavrsen','placeno':true}},(err,resp)=>{
                                if(err) console.log(err);
                                else{
                                    res.json({'message':'ok'})
                                }
                            })
                        }
                        else{
                            //agencija nije oslobodila radnike, korisnik je zadovoljan pa se posao zavrsava
                            ZaposleniModel.updateOne({'agencija':posao['agencija']},{$inc:{'brojRadnika':posao['brojRadnika']}},(err,resp)=>{
                                if(err) console.log(err);
                                else{
                                    PosaoModel.updateOne({'objekat':idO,'status':'aktivan'},{$set:{'status':'zavrsen','placeno':true,'brojRadnika':null}},(err,resp)=>{
                                        if(err) console.log(err);
                                        else{
                                            RadnikModel.updateMany({'objekat':idO},{$set:{'objekat':null}},(err,resp)=>{
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
                    }
                })
                
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
    odbijPonudu=(req:express.Request,res:express.Response)=>{
        PosaoModel.deleteOne({'_id':req.body.idP},(err,resp)=>{
            if(err)console.log(err);
            else{
                //moramo da postavimo status objekta da se vise ne renovira
                ObjekatModel.updateOne({'_id':req.body.idO},{$set:{'renoviranje':false}},(err,resp)=>{
                    if(err) console.log(err);
                    else{
                        res.json({'message':'ok'});
                    }
                })
            }
        })
    }
    prihvatiPonudu=(req:express.Request,res:express.Response)=>{
        PosaoModel.updateOne({'_id':req.body.id},{$set:{'status':'aktivan', 'prihvacen':true}},(err,resp)=>{
            if(err)console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }
    dohvatiKomentar=(req:express.Request,res:express.Response)=>{
        KomentarModel.findOne({'idPosla':req.body.idPosla},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json(resp);
            }
        })
    }
    ostaviKomentar=(req:express.Request,res:express.Response)=>{
        let komentar=new KomentarModel({
            agencija:req.body.agencija,
            klijent:req.body.korisnik,
            idPosla:req.body.idPosla,
            komentar:req.body.komentar,
            ocena:req.body.ocena
        })
        komentar.save((err,resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'});
            }
        })
    }
    izmeniKomentar=(req:express.Request,res:express.Response)=>{
        KomentarModel.updateOne({'idPosla':req.body.idPosla},{$set:{'ocena':req.body.ocena,'komentar':req.body.komentar}},(err,resp)=>{
            if(err) console.log(err)
            else{
                res.json({'message':'ok'})
            }
        })
    }
    obirisiKomentar=(req:express.Request,res:express.Response)=>{
        KomentarModel.deleteOne({'idPosla':req.body.idPosla},(err,resp)=>{
            if(err)console.log(err);
            else{
                res.json({'message':'ok'});
            }
        })
    }
    //potencijalno i ovde treba da se oslobode radnici--> ili tek kad admin odobri zahtev za otkazivanje.
    zahtevOtkazivanje=(req:express.Request,res:express.Response)=>{
        PosaoModel.updateOne({'_id':req.body.idPosla},{$set:{'status':'u procesu otkazivanja','razlogOtkazivanja':req.body.razlog}},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }
    
}