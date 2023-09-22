"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const adminRouter = express_1.default.Router();
adminRouter.route('/login').post((req, res) => new admin_controller_1.AdminController().loginAdmin(req, res));
adminRouter.route('/dohvSveKorisnike').get((req, res) => new admin_controller_1.AdminController().dohvSveKorisnike(req, res));
adminRouter.route('/prihvatiZahtevReg').post((req, res) => new admin_controller_1.AdminController().prihvatiZahtevReg(req, res));
adminRouter.route('/odbijZahtevReg').post((req, res) => new admin_controller_1.AdminController().odbijZahtevReg(req, res));
adminRouter.route('/dohvatiZaposlene').post((req, res) => new admin_controller_1.AdminController().dohvatiZaposlene(req, res));
adminRouter.route('/dodajRadnike').post((req, res) => new admin_controller_1.AdminController().dodajRadnike(req, res));
adminRouter.route('/povecajBrojRadnika').post((req, res) => new admin_controller_1.AdminController().promeniBrojRadnika(req, res));
adminRouter.route('/smanjiBrojRadnika').post((req, res) => new admin_controller_1.AdminController().promeniBrojRadnika(req, res));
adminRouter.route('/dohvSvePoslove').get((req, res) => new admin_controller_1.AdminController().dohvSvePoslove(req, res));
adminRouter.route('/prihvatiZahtevOtkazivanje').post((req, res) => new admin_controller_1.AdminController().prihvatiZahtevOtkazivanje(req, res));
adminRouter.route('/odbijZahtevOtkazivanje').post((req, res) => new admin_controller_1.AdminController().odbijZahtevOtkazivanje(req, res));
adminRouter.route('/obrisiKorisnika').post((req, res) => new admin_controller_1.AdminController().obrisiKorisnika(req, res));
adminRouter.route('/dohvatiRadnike').post((req, res) => new admin_controller_1.AdminController().dohvatiRadnike(req, res));
adminRouter.route('/obrisiRadnika').post((req, res) => new admin_controller_1.AdminController().obrisiRadnika(req, res));
adminRouter.route('/azurirajRadnika').post((req, res) => new admin_controller_1.AdminController().azurirajRadnika(req, res));
adminRouter.route('/prihvatiZahtevOtkazivanjeBezZaposlenih').post((req, res) => new admin_controller_1.AdminController().prihvatiZahtevOtkazivanjeBezZaposlenih(req, res));
adminRouter.route('/dohvZahtevRadnaMesta').post((req, res) => new admin_controller_1.AdminController().dohvatiZahtevRadnaMesta(req, res));
adminRouter.route('/prihvatiZahtevRadnaMesta').post((req, res) => new admin_controller_1.AdminController().prihvatiZahtevRadnaMesta(req, res));
adminRouter.route('/odbijZahtevRadnaMesta').post((req, res) => new admin_controller_1.AdminController().odbijZahtevRadnaMesta(req, res));
exports.default = adminRouter;
//# sourceMappingURL=admin.router.js.map