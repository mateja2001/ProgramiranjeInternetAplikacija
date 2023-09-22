"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KlijentController = void 0;
const korisnik_1 = __importDefault(require("../models/korisnik"));
const objekat_1 = __importDefault(require("../models/objekat"));
const posao_1 = __importDefault(require("../models/posao"));
const komentar_1 = __importDefault(require("../models/komentar"));
const zaposleni_1 = __importDefault(require("../models/zaposleni"));
const radnik_1 = __importDefault(require("../models/radnik"));
class KlijentController {
    constructor() {
        this.azurirajPodatke = (req, res) => {
            let korisnik = req.body.korisnik;
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            let mejl = req.body.mejl;
            let telefon = req.body.telefon;
            korisnik_1.default.updateOne({ 'korisnickoIme': korisnik }, { $set: { 'ime': ime, 'prezime': prezime, 'telefon': telefon, 'mejl': mejl } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.azurirajPodatkeISliku = (req, res) => {
            let korisnik = req.body.korisnik;
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            let mejl = req.body.mejl;
            let telefon = req.body.telefon;
            let slika = req.body.slika;
            korisnik_1.default.updateOne({ 'korisnickoIme': korisnik }, { $set: { 'ime': ime, 'prezime': prezime, 'telefon': telefon, 'mejl': mejl, 'slika': slika } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.dohvatiObjekte = (req, res) => {
            let korisnik = req.body.korisnik;
            objekat_1.default.find({ 'korisnik': korisnik }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(resp);
                }
            });
        };
        this.dodajObjekat = (req, res) => {
            let objekat = new objekat_1.default({
                korisnik: req.body.objekat.korisnik,
                tip: req.body.objekat.tip,
                adresa: req.body.objekat.adresa,
                brojProstorija: req.body.objekat.brojProstorija,
                kvadratura: req.body.objekat.kvadratura,
                renoviranje: false,
                prostorije: req.body.objekat.prostorije,
            });
            objekat.save((err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.obrisiObjekat = (req, res) => {
            objekat_1.default.deleteOne({ '_id': req.body.id }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.izmeniObjekat = (req, res) => {
            let _id = req.body.objekat._id;
            let tip = req.body.objekat.tip;
            let adresa = req.body.objekat.adresa;
            let brojProstorija = req.body.objekat.brojProstorija;
            let kvadratura = req.body.objekat.kvadratura;
            let prostorije = req.body.objekat.prostorije;
            objekat_1.default.updateOne({ '_id': _id }, { $set: { 'tip': tip, 'adresa': adresa, 'brojProstorija': brojProstorija, 'kvadratura': kvadratura, 'prostorije': prostorije } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.dohvatiSveAgencije = (req, res) => {
            korisnik_1.default.find({ 'tip': 'agencija', 'odobren': true }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(resp);
                }
            });
        };
        this.pretraziAgencije = (req, res) => {
            let naziv = req.body.naziv;
            let adresa = req.body.adresa;
            korisnik_1.default.find({ 'nazivAgencije': { $regex: naziv }, 'adresaAgencije': { $regex: adresa } }, (err, agen) => {
                if (err)
                    console.log(err);
                else {
                    res.json(agen);
                }
            });
        };
        this.dohvatiObjekteZaRenoviranje = (req, res) => {
            let korisnik = req.body.korisnik;
            objekat_1.default.find({ 'korisnik': korisnik, 'renoviranje': false }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(resp);
                }
            });
        };
        this.zahtevZaSaradnjom = (req, res) => {
            let posao = new posao_1.default({
                korisnik: req.body.korisnik,
                objekat: req.body.objekat,
                agencija: req.body.agencija,
                datumPocetka: req.body.datumPocetka,
                datumKraja: req.body.datumKraja,
                prihvacen: null,
                status: 'zahtev',
                placeno: false,
                ponuda: null,
                razlogOtkazivanja: null,
                brojRadnika: null
            });
            posao.save((err, resp) => {
                if (err)
                    console.log(err);
                else {
                    objekat_1.default.updateOne({ '_id': req.body.objekat }, { $set: { 'renoviranje': true } }, (err, rsp) => {
                        if (err)
                            console.log(err);
                        else {
                            res.json({ 'message': 'ok' });
                        }
                    });
                }
            });
        };
        this.dohvatiPosloveKlijenta = (req, res) => {
            posao_1.default.find({ 'korisnik': req.body.korisnik }, (err, resp) => {
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
        //potencijalno po zavrsetku posla treba da vratimo radnike(-> ili to moze kad agencija zavrsi)
        this.platiPosao = (req, res) => {
            let idO = req.body.id;
            objekat_1.default.updateOne({ '_id': idO }, { $set: { 'renoviranje': false } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    posao_1.default.findOne({ 'objekat': idO, 'status': 'aktivan' }, (err, posao) => {
                        if (err)
                            console.log(err);
                        else {
                            if (posao['brojRadnika'] == null) {
                                //agencija je vec oslobodila radnike
                                posao_1.default.updateOne({ 'objekat': idO, 'status': 'aktivan' }, { $set: { 'status': 'zavrsen', 'placeno': true } }, (err, resp) => {
                                    if (err)
                                        console.log(err);
                                    else {
                                        res.json({ 'message': 'ok' });
                                    }
                                });
                            }
                            else {
                                //agencija nije oslobodila radnike, korisnik je zadovoljan pa se posao zavrsava
                                zaposleni_1.default.updateOne({ 'agencija': posao['agencija'] }, { $inc: { 'brojRadnika': posao['brojRadnika'] } }, (err, resp) => {
                                    if (err)
                                        console.log(err);
                                    else {
                                        posao_1.default.updateOne({ 'objekat': idO, 'status': 'aktivan' }, { $set: { 'status': 'zavrsen', 'placeno': true, 'brojRadnika': null } }, (err, resp) => {
                                            if (err)
                                                console.log(err);
                                            else {
                                                radnik_1.default.updateMany({ 'objekat': idO }, { $set: { 'objekat': null } }, (err, resp) => {
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
                        }
                    });
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
        this.odbijPonudu = (req, res) => {
            posao_1.default.deleteOne({ '_id': req.body.idP }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    //moramo da postavimo status objekta da se vise ne renovira
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
        this.prihvatiPonudu = (req, res) => {
            posao_1.default.updateOne({ '_id': req.body.id }, { $set: { 'status': 'aktivan', 'prihvacen': true } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.dohvatiKomentar = (req, res) => {
            komentar_1.default.findOne({ 'idPosla': req.body.idPosla }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(resp);
                }
            });
        };
        this.ostaviKomentar = (req, res) => {
            let komentar = new komentar_1.default({
                agencija: req.body.agencija,
                klijent: req.body.korisnik,
                idPosla: req.body.idPosla,
                komentar: req.body.komentar,
                ocena: req.body.ocena
            });
            komentar.save((err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.izmeniKomentar = (req, res) => {
            komentar_1.default.updateOne({ 'idPosla': req.body.idPosla }, { $set: { 'ocena': req.body.ocena, 'komentar': req.body.komentar } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.obirisiKomentar = (req, res) => {
            komentar_1.default.deleteOne({ 'idPosla': req.body.idPosla }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        //potencijalno i ovde treba da se oslobode radnici--> ili tek kad admin odobri zahtev za otkazivanje.
        this.zahtevOtkazivanje = (req, res) => {
            posao_1.default.updateOne({ '_id': req.body.idPosla }, { $set: { 'status': 'u procesu otkazivanja', 'razlogOtkazivanja': req.body.razlog } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
    }
}
exports.KlijentController = KlijentController;
//# sourceMappingURL=klijent.controller.js.map