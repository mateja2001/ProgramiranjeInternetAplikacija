"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Objekat = new Schema({
    korisnik: {
        type: String
    },
    tip: {
        type: String
    },
    adresa: {
        type: String
    },
    brojProstorija: {
        type: Number
    },
    kvadratura: {
        type: Number
    },
    renoviranje: {
        type: Boolean
    },
    prostorije: {
        type: [{
                xKoord: {
                    type: Number
                },
                yKoord: {
                    type: Number
                },
                duzina: {
                    type: Number
                },
                sirina: {
                    type: Number
                },
                xVrata: {
                    type: Number
                },
                yVrata: {
                    type: Number
                },
                status: {
                    type: String
                }
            }]
    }
});
exports.default = mongoose_1.default.model('ObjekatModel', Objekat, 'objekti');
//# sourceMappingURL=objekat.js.map