"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Posao = new Schema({
    korisnik: {
        type: String
    },
    agencija: {
        type: String
    },
    objekat: {
        type: String //predstavlja _id objekta
    },
    prihvacen: {
        type: Boolean
    },
    datumPocetka: {
        type: String
    },
    datumKraja: {
        type: String
    },
    status: {
        type: String
    },
    placeno: {
        type: Boolean
    },
    ponuda: {
        type: Number
    },
    razlogOtkazivanja: {
        type: String
    },
    brojRadnika: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('PosaoModel', Posao, 'poslovi');
//# sourceMappingURL=posao.js.map