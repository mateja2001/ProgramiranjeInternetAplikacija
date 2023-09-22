"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const korisnik_1 = __importDefault(require("../models/korisnik"));
const objekat_1 = __importDefault(require("../models/objekat"));
const posao_1 = __importDefault(require("../models/posao"));
const zaposleni_1 = __importDefault(require("../models/zaposleni"));
const radnik_1 = __importDefault(require("../models/radnik"));
const zahtev_1 = __importDefault(require("../models/zahtev"));
class AdminController {
    constructor() {
        this.loginAdmin = (req, res) => {
            let korIme = req.body.korIme;
            let lozinka = req.body.lozinka;
            korisnik_1.default.findOne({ 'korisnickoIme': korIme, 'lozinka': lozinka }, (err, kor) => {
                if (err)
                    console.log(err);
                else {
                    res.json(kor);
                }
            });
        };
        this.dohvSveKorisnike = (req, res) => {
            korisnik_1.default.find({}, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(resp);
                }
            });
        };
        this.prihvatiZahtevReg = (req, res) => {
            korisnik_1.default.updateOne({ 'korisnickoIme': req.body.korIme }, { $set: { 'odobren': true } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.odbijZahtevReg = (req, res) => {
            korisnik_1.default.updateOne({ 'korisnickoIme': req.body.korIme }, { $set: { 'odbijen': true } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.dohvatiZaposlene = (req, res) => {
            zaposleni_1.default.findOne({ 'agencija': req.body.korIme }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(resp);
                }
            });
        };
        this.dodajRadnike = (req, res) => {
            let zaposleni = req.body.zaposleni;
            if (zaposleni == null) {
                //agencija nema ni jednog zaposlenog
                let zap = new zaposleni_1.default({
                    agencija: req.body.agencija,
                    brojRadnika: 1,
                    brojZaposlenih: 1,
                    brojRadnihMesta: 5
                });
                zap.save((err, resp) => {
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
            }
            else {
                //agencija prethodno ima vec zaposlenih
                zaposleni_1.default.updateOne({ 'agencija': req.body.agencija }, { $inc: { 'brojRadnika': 1, 'brojZaposlenih': 1, 'brojRadnihMesta': 1 } }, (err, resp) => {
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
            }
        };
        this.promeniBrojRadnika = (req, res) => {
            zaposleni_1.default.updateOne({ 'agencija': req.body.agencija }, { $set: { 'brojRadnika': req.body.trenutno, 'brojZaposlenih': req.body.radnici } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.dohvSvePoslove = (req, res) => {
            posao_1.default.find({}, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(resp);
                }
            });
        };
        this.prihvatiZahtevOtkazivanje = (req, res) => {
            let idObj = req.body.idObj;
            let idPos = req.body.idPos;
            let agencija = req.body.agencija;
            let brRadnika = req.body.brRadnika;
            posao_1.default.deleteOne({ '_id': idPos }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    objekat_1.default.updateOne({ '_id': idObj }, { $set: { 'renoviranje': false } }, (err, resp) => {
                        if (err)
                            console.log(err);
                        else {
                            zaposleni_1.default.updateOne({ 'agencija': agencija }, { $set: { 'brojRadnika': brRadnika } }, (err, resp) => {
                                if (err)
                                    console.log(err);
                                else {
                                    radnik_1.default.updateMany({ 'objekat': idObj }, { $set: { 'objekat': null } }, (err, resp) => {
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
                }
            });
        };
        this.odbijZahtevOtkazivanje = (req, res) => {
            let idPos = req.body.idPos;
            posao_1.default.updateOne({ '_id': idPos }, { $set: { 'status': 'aktivan' } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.obrisiKorisnika = (req, res) => {
            korisnik_1.default.deleteOne({ 'korisnickoIme': req.body.korIme }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
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
        this.prihvatiZahtevOtkazivanjeBezZaposlenih = (req, res) => {
            let idObj = req.body.idObj;
            let idPos = req.body.idPos;
            posao_1.default.deleteOne({ '_id': idPos }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    objekat_1.default.updateOne({ '_id': idObj }, { $set: { 'renoviranje': false } }, (err, resp) => {
                        if (err)
                            console.log(err);
                        else {
                            res.json({ 'message': 'ok' });
                        }
                    });
                }
            });
        };
        this.dohvatiZahtevRadnaMesta = (req, res) => {
            zahtev_1.default.findOne({ 'agencija': req.body.agencija }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(resp);
                }
            });
        };
        this.prihvatiZahtevRadnaMesta = (req, res) => {
            let zaposleni = req.body.zaposleni;
            if (zaposleni == null) {
                //agencija nije pre otvorenih radnih mesta;
                let zap = new zaposleni_1.default({
                    agencija: req.body.agencija,
                    brojRadnika: 0,
                    brojZaposlenih: 0,
                    brojRadnihMesta: req.body.brojMesta
                });
                zap.save((err, resp) => {
                    if (err)
                        console.log(err);
                    else {
                        zahtev_1.default.deleteOne({ 'agencija': req.body.agencija }, (err, resp) => {
                            if (err)
                                console.log(err);
                            else {
                                res.json({ 'message': 'ok' });
                            }
                        });
                    }
                });
            }
            else {
                //agencija pre imala otvorena radna mesta
                zaposleni_1.default.updateOne({ 'agencija': req.body.agencija }, { $inc: { 'brojRadnihMesta': req.body.brojMesta } }, (err, resp) => {
                    if (err)
                        console.log(err);
                    else {
                        zahtev_1.default.deleteOne({ 'agencija': req.body.agencija }, (err, resp) => {
                            if (err)
                                console.log(err);
                            else {
                                res.json({ 'message': 'ok' });
                            }
                        });
                    }
                });
            }
        };
        this.odbijZahtevRadnaMesta = (req, res) => {
            zahtev_1.default.deleteOne({ 'agencija': req.body.agencija }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map