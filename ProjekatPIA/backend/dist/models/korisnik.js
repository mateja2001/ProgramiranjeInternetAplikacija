"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Korisnik = new Schema({
    korisnickoIme: {
        type: String
    },
    lozinka: {
        type: String
    },
    telefon: {
        type: String
    },
    mejl: {
        type: String
    },
    tip: {
        type: String
    },
    odobren: {
        type: Boolean
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    nazivAgencije: {
        type: String
    },
    adresaAgencije: {
        type: String
    },
    maticniBrAgencije: {
        type: String
    },
    opisAgencije: {
        type: String
    },
    slika: {
        type: String
    },
    odbijen: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('KorisnikModel', Korisnik, 'korisnici');
//# sourceMappingURL=korisnik.js.map