"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Zahtev = new Schema({
    agencija: {
        type: String
    },
    brojMesta: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('ZahtevModel', Zahtev, 'zahtevi');
//# sourceMappingURL=zahtev.js.map