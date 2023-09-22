"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencijaController = void 0;
const korisnik_1 = __importDefault(require("../models/korisnik"));
const objekat_1 = __importDefault(require("../models/objekat"));
const posao_1 = __importDefault(require("../models/posao"));
const zaposleni_1 = __importDefault(require("../models/zaposleni"));
const radnik_1 = __importDefault(require("../models/radnik"));
const zahtev_1 = __importDefault(require("../models/zahtev"));
class AgencijaController {
    constructor() {
        this.azurirajPodatke = (req, res) => {
            let korisnik = req.body.korisnik;
            let adresa = req.body.adresa;
            let naziv = req.body.naziv;
            let opis = req.body.opis;
            let mejl = req.body.mejl;
            let telefon = req.body.telefon;
            korisnik_1.default.updateOne({ 'korisnickoIme': korisnik }, { $set: { 'nazivAgencije': naziv, 'adresaAgencije': adresa, 'opisAgencije': opis, 'telefon': telefon, 'mejl': mejl } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.azurirajPodatkeISliku = (req, res) => {
            let korisnik = req.body.korisnik;
            let adresa = req.body.adresa;
            let naziv = req.body.naziv;
            let opis = req.body.opis;
            let mejl = req.body.mejl;
            let telefon = req.body.telefon;
            let slika = req.body.slika;
            korisnik_1.default.updateOne({ 'korisnickoIme': korisnik }, { $set: { 'slika': slika, 'nazivAgencije': naziv, 'adresaAgencije': adresa, 'opisAgencije': opis, 'telefon': telefon, 'mejl': mejl } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.dohvatiPoslove = (req, res) => {
            posao_1.default.find({ 'agencija': req.body.agencija }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(resp);
                }
            });
        };
        this.dohvatiObjekat = (req, res) => {
            objekat_1.default.findOne({ '_id': req.body.id }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(resp);
                }
            });
        };
        this.dohvatiKorisnika = (req, res) => {
            korisnik_1.default.findOne({ 'korisnickoIme': req.body.korIme }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(resp);
                }
            });
        };
        this.dohvatiKorisnike = (req, res) => {
            korisnik_1.default.find({}, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(resp);
                }
            });
        };
        this.dohvatiObjekte = (req, res) => {
            objekat_1.default.find({}, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(resp);
                }
            });
        };
        this.odbijZahtev = (req, res) => {
            posao_1.default.updateOne({ '_id': req.body.id }, { $set: { 'prihvacen': false } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    objekat_1.default.updateOne({ '_id': req.body.idO }, { $set: { 'renoviranje': false } }, (err, resp) => {
                        if (err)
                            console.log(err);
                        else {
                            res.json({ 'message': 'ok' });
                        }
                    });
                }
            });
        };
        this.prihvatiZahtev = (req, res) => {
            posao_1.default.updateOne({ '_id': req.body.id }, { $set: { 'ponuda': req.body.ponuda } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.dohvZaposlene = (req, res) => {
            zaposleni_1.default.findOne({ 'agencija': req.body.agencija }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(resp);
                }
            });
        };
        this.dodeliRadnike = (req, res) => {
            zaposleni_1.default.updateOne({ 'agencija': req.body.agencija }, { $set: { 'brojRadnika': req.body.preostaliRad } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    posao_1.default.updateOne({ '_id': req.body.idPosla }, { $set: { 'brojRadnika': req.body.radnici } }, (err, resp) => {
                        if (err)
                            console.log(err);
                        else {
                            res.json({ 'message': 'ok' });
                        }
                    });
                }
            });
        };
        this.dohvatiPosao = (req, res) => {
            posao_1.default.findOne({ '_id': req.body.idPosla }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(resp);
                }
            });
        };
        this.izmeniObjekat = (req, res) => {
            let _id = req.body.objekat._id;
            let prostorije = req.body.objekat.prostorije;
            objekat_1.default.updateOne({ '_id': _id }, { $set: { 'prostorije': prostorije } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.oslobodiRadnike = (req, res) => {
            zaposleni_1.default.updateOne({ 'agencija': req.body.agencija }, { $inc: { 'brojRadnika': req.body.brojZauzetih } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    posao_1.default.updateOne({ '_id': req.body.idPosla }, { $set: { 'brojRadnika': null } }, (err, resp) => {
                        if (err)
                            console.log(err);
                        else {
                            radnik_1.default.updateMany({ 'objekat': req.body.objekat }, { $set: { 'objekat': null } }, (err, resp) => {
                                if (err)
                                    console.log(err);
                                else {
                                    res.json({ 'message': 'ok' });
                                }
                            });
                        }
                    });
                }
            });
        };
        this.dohvatiRadnike = (req, res) => {
            radnik_1.default.find({ 'agencija': req.body.agencija }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(resp);
                }
            });
        };
        this.obrisiRadnika = (req, res) => {
            radnik_1.default.deleteOne({ '_id': req.body.id }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    //necemo smanjivati broj radnih mesta
                    zaposleni_1.default.updateOne({ 'agencija': req.body.agencija }, { $inc: { 'brojRadnika': -1, 'brojZaposlenih': -1 } }, (err, resp) => {
                        if (err)
                            console.log(err);
                        else {
                            res.json({ 'message': 'ok' });
                        }
                    });
                }
            });
        };
        this.azurirajRadnika = (req, res) => {
            let id = req.body.radnik._id;
            let ime = req.body.radnik.ime;
            let prezime = req.body.radnik.prezime;
            let mejl = req.body.radnik.mejl;
            let telefon = req.body.radnik.telefon;
            let strucnost = req.body.radnik.strucnost;
            radnik_1.default.updateOne({ '_id': id }, { $set: { 'ime': ime, 'prezime': prezime, 'mejl': mejl, 'telefon': telefon, 'strucnost': strucnost } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.dodajRadnike = (req, res) => {
            //agencija prethodno ima vec zaposlenih, kad agencija dodaje radnike, ne povecava broj radnih mesta
            zaposleni_1.default.updateOne({ 'agencija': req.body.agencija }, { $inc: { 'brojRadnika': 1, 'brojZaposlenih': 1 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    let rad = new radnik_1.default({
                        ime: req.body.radnik.ime,
                        prezime: req.body.radnik.prezime,
                        mejl: req.body.radnik.mejl,
                        telefon: req.body.radnik.telefon,
                        strucnost: req.body.radnik.strucnost,
                        agencija: req.body.radnik.agencija,
                        objekat: null
                    });
                    rad.save((err, respp) => {
                        if (err)
                            console.log(err);
                        else {
                            res.json({ 'message': 'ok' });
                        }
                    });
                }
            });
        };
        this.dohvatiSlobodneRadnike = (req, res) => {
            radnik_1.default.find({ 'agencija': req.body.agencija, 'objekat': null }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(resp);
                }
            });
        };
        this.uposliRadnika = (req, res) => {
            radnik_1.default.updateOne({ '_id': req.body.idRadnika }, { $set: { 'objekat': req.body.objekat } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.zahtevRadnaMesta = (req, res) => {
            let zah = new zahtev_1.default({
                agencija: req.body.agencija,
                brojMesta: req.body.brojMesta
            });
            zah.save((err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.dohvatiZahtev = (req, res) => {
            zahtev_1.default.findOne({ 'agencija': req.body.agencija }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(resp);
                }
            });
        };
    }
}
exports.AgencijaController = AgencijaController;
//# sourceMappingURL=agencija.controller.js.map