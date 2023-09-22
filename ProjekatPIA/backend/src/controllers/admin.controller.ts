import express from 'express'
import KorisnikModel from '../models/korisnik'
import ObjekatModel from '../models/objekat'
import PosaoModel from '../models/posao'
import ZaposleniModel from '../models/zaposleni'
import RadnikModel from '../models/radnik'
import ZahtevModel from '../models/zahtev'
export class AdminController{
    loginAdmin=(req:express.Request,res:express.Response)=>{
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
    prihvatiZahtevReg=(req:express.Request,res:express.Response)=>{
        KorisnikModel.updateOne({'korisnickoIme':req.body.korIme},{$set:{'odobren':true}},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'});
            }
        })
    }
    odbijZahtevReg=(req:express.Request,res:express.Response)=>{
        KorisnikModel.updateOne({'korisnickoIme':req.body.korIme},{$set:{'odbijen':true}},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'});
            }
        })
    }
    dohvatiZaposlene=(req:express.Request,res:express.Response)=>{
        ZaposleniModel.findOne({'agencija':req.body.korIme},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json(resp);
            }
        })
    }
    dodajRadnike=(req:express.Request,res:express.Response)=>{
        let zaposleni=req.body.zaposleni;
        if(zaposleni==null){
            //agencija nema ni jednog zaposlenog
            let zap= new ZaposleniModel({
                agencija:req.body.agencija,
                brojRadnika:1,
                brojZaposlenih:1,
                brojRadnihMesta:5
            })
            zap.save((err,resp)=>{
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
        else{
            //agencija prethodno ima vec zaposlenih
            ZaposleniModel.updateOne({'agencija':req.body.agencija},{$inc:{'brojRadnika':1,'brojZaposlenih':1,'brojRadnihMesta':1}},(err,resp)=>{
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
    }
    promeniBrojRadnika=(req:express.Request,res:express.Response)=>{
        ZaposleniModel.updateOne({'agencija':req.body.agencija},{$set:{'brojRadnika':req.body.trenutno,'brojZaposlenih':req.body.radnici}},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }
    dohvSvePoslove=(req:express.Request,res:express.Response)=>{
        PosaoModel.find({},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json(resp);
            }
        })
    }
    prihvatiZahtevOtkazivanje=(req:express.Request,res:express.Response)=>{
        let idObj=req.body.idObj
        let idPos=req.body.idPos
        let agencija=req.body.agencija
        let brRadnika=req.body.brRadnika
        PosaoModel.deleteOne({'_id':idPos},(err,resp)=>{
            if(err) console.log(err)
            else{
                ObjekatModel.updateOne({'_id':idObj},{$set:{'renoviranje':false}},(err,resp)=>{
                    if(err) console.log(err);
                    else{
                        ZaposleniModel.updateOne({'agencija':agencija},{$set:{'brojRadnika':brRadnika}},(err,resp)=>{
                            if(err) console.log(err);
                            else{
                                RadnikModel.updateMany({'objekat':idObj},{$set:{'objekat':null}},(err,resp)=>{
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
        })
    }
    odbijZahtevOtkazivanje=(req:express.Request,res:express.Response)=>{
        let idPos=req.body.idPos
        PosaoModel.updateOne({'_id':idPos},{$set:{'status':'aktivan'}},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'});
            }
        })
    }
    obrisiKorisnika=(req:express.Request,res:express.Response)=>{
        KorisnikModel.deleteOne({'korisnickoIme':req.body.korIme},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'});
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
    prihvatiZahtevOtkazivanjeBezZaposlenih=(req:express.Request,res:express.Response)=>{
        let idObj=req.body.idObj
        let idPos=req.body.idPos
        PosaoModel.deleteOne({'_id':idPos},(err,resp)=>{
            if(err) console.log(err)
            else{
                ObjekatModel.updateOne({'_id':idObj},{$set:{'renoviranje':false}},(err,resp)=>{
                    if(err) console.log(err);
                    else{
                        res.json({'message':'ok'})
                    }
                })
            }
        })
    }
    dohvatiZahtevRadnaMesta=(req:express.Request,res:express.Response)=>{
        ZahtevModel.findOne({'agencija':req.body.agencija},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json(resp);
            }
        })
    }
    prihvatiZahtevRadnaMesta=(req:express.Request,res:express.Response)=>{
        let zaposleni=req.body.zaposleni
        if(zaposleni==null){
            //agencija nije pre otvorenih radnih mesta;
            let zap= new ZaposleniModel({
                agencija:req.body.agencija,
                brojRadnika:0,
                brojZaposlenih:0,
                brojRadnihMesta:req.body.brojMesta
            })
            zap.save((err,resp)=>{
                if(err) console.log(err);
                else{
                    ZahtevModel.deleteOne({'agencija':req.body.agencija},(err,resp)=>{
                        if(err) console.log(err);
                        else{
                            res.json({'message':'ok'})
                        }
                    })
                }
            })
        }
        else{
            //agencija pre imala otvorena radna mesta
            ZaposleniModel.updateOne({'agencija':req.body.agencija},{$inc:{'brojRadnihMesta':req.body.brojMesta}},(err,resp)=>{
                if(err) console.log(err);
                else{
                    ZahtevModel.deleteOne({'agencija':req.body.agencija},(err,resp)=>{
                        if(err) console.log(err);
                        else{
                            res.json({'message':'ok'})
                        }
                    })
                }
            })
        }
    }
    odbijZahtevRadnaMesta=(req:express.Request,res:express.Response)=>{
        ZahtevModel.deleteOne({'agencija':req.body.agencija},(err,resp)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }
    
}