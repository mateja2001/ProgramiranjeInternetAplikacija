"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikController = void 0;
const korisnik_1 = __importDefault(require("../models/korisnik"));
const komentar_1 = __importDefault(require("../models/komentar"));
class KorisnikController {
    constructor() {
        this.login = (req, res) => {
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
        this.registracijaKorisnika = (req, res) => {
            if (req.body.tip == 'agencija') {
                let korisnik = new korisnik_1.default({
                    korisnickoIme: req.body.korisnickoIme,
                    lozinka: req.body.lozinka,
                    telefon: req.body.telefon,
                    mejl: req.body.mejl,
                    tip: req.body.tip,
                    odobren: false,
                    ime: null,
                    prezime: null,
                    nazivAgencije: req.body.nazivAgencije,
                    adresaAgencije: req.body.adresaAgencije,
                    maticniBrAgencije: req.body.maticniBrAgencije,
                    opisAgencije: req.body.opisAgencije,
                    slika: req.body.slika,
                    odbijen: false
                });
                korisnik.save((err, resp) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json({ 'message': 'ok' });
                    }
                });
            }
            else {
                let korisnik = new korisnik_1.default({
                    korisnickoIme: req.body.korisnickoIme,
                    lozinka: req.body.lozinka,
                    telefon: req.body.telefon,
                    mejl: req.body.mejl,
                    tip: req.body.tip,
                    odobren: false,
                    ime: req.body.ime,
                    prezime: req.body.prezime,
                    nazivAgencije: null,
                    adresaAgencije: null,
                    maticniBrAgencije: null,
                    opisAgencije: null,
                    slika: req.body.slika,
                    odbijen: false
                });
                korisnik.save((err, resp) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json({ 'message': 'ok' });
                    }
                });
            }
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
        this.dohvatiKomentare = (req, res) => {
            komentar_1.default.find({ 'agencija': req.body.agencija }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(resp);
                }
            });
        };
        this.promeniLozinku = (req, res) => {
            korisnik_1.default.updateOne({ 'korisnickoIme': req.body.korisnik }, { $set: { 'lozinka': req.body.novaLozinka } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.dohvKorisnika = (req, res) => {
            korisnik_1.default.findOne({ 'korisnickoIme': req.body.korisnik }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json(resp);
                }
            });
        };
    }
}
exports.KorisnikController = KorisnikController;
//# sourceMappingURL=korisnik.controller.js.map