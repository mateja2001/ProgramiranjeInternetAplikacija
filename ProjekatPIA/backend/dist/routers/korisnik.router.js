"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const korisnik_controller_1 = require("../controllers/korisnik.controller");
const korisnikRouter = express_1.default.Router();
korisnikRouter.route('/login').post((req, res) => new korisnik_controller_1.KorisnikController().login(req, res));
korisnikRouter.route('/sviKorisnici').get((req, res) => new korisnik_controller_1.KorisnikController().dohvSveKorisnike(req, res));
korisnikRouter.route('/registracija').post((req, res) => new korisnik_controller_1.KorisnikController().registracijaKorisnika(req, res));
korisnikRouter.route('/pretraziAgencije').post((req, res) => new korisnik_controller_1.KorisnikController().pretraziAgencije(req, res));
korisnikRouter.route('/dohvatiKomentare').post((req, res) => new korisnik_controller_1.KorisnikController().dohvatiKomentare(req, res));
korisnikRouter.route('/promeniLozinku').post((req, res) => new korisnik_controller_1.KorisnikController().promeniLozinku(req, res));
korisnikRouter.route('/dohvKorisnika').post((req, res) => new korisnik_controller_1.KorisnikController().dohvKorisnika(req, res));
exports.default = korisnikRouter;
//# sourceMappingURL=korisnik.router.js.map