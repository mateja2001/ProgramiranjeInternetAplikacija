import express from 'express'
import { AdminController } from '../controllers/admin.controller';

const adminRouter=express.Router();

adminRouter.route('/login').post(
    (req,res)=>new AdminController().loginAdmin(req,res)
)
adminRouter.route('/dohvSveKorisnike').get(
    (req,res)=>new AdminController().dohvSveKorisnike(req,res)
)
adminRouter.route('/prihvatiZahtevReg').post(
    (req,res)=>new AdminController().prihvatiZahtevReg(req,res)
)
adminRouter.route('/odbijZahtevReg').post(
    (req,res)=>new AdminController().odbijZahtevReg(req,res)
)
adminRouter.route('/dohvatiZaposlene').post(
    (req,res)=>new AdminController().dohvatiZaposlene(req,res)
)
adminRouter.route('/dodajRadnike').post(
    (req,res)=>new AdminController().dodajRadnike(req,res)
)
adminRouter.route('/povecajBrojRadnika').post(
    (req,res)=>new AdminController().promeniBrojRadnika(req,res)
)
adminRouter.route('/smanjiBrojRadnika').post(
    (req,res)=>new AdminController().promeniBrojRadnika(req,res)
)
adminRouter.route('/dohvSvePoslove').get(
    (req,res)=>new AdminController().dohvSvePoslove(req,res)
)
adminRouter.route('/prihvatiZahtevOtkazivanje').post(
    (req,res)=>new AdminController().prihvatiZahtevOtkazivanje(req,res)
)
adminRouter.route('/odbijZahtevOtkazivanje').post(
    (req,res)=>new AdminController().odbijZahtevOtkazivanje(req,res)
)
adminRouter.route('/obrisiKorisnika').post(
    (req,res)=>new AdminController().obrisiKorisnika(req,res)
)
adminRouter.route('/dohvatiRadnike').post(
    (req,res)=>new AdminController().dohvatiRadnike(req,res)
)
adminRouter.route('/obrisiRadnika').post(
    (req,res)=>new AdminController().obrisiRadnika(req,res)
)
adminRouter.route('/azurirajRadnika').post(
    (req,res)=>new AdminController().azurirajRadnika(req,res)
)
adminRouter.route('/prihvatiZahtevOtkazivanjeBezZaposlenih').post(
    (req,res)=>new AdminController().prihvatiZahtevOtkazivanjeBezZaposlenih(req,res)
)
adminRouter.route('/dohvZahtevRadnaMesta').post(
    (req,res)=>new AdminController().dohvatiZahtevRadnaMesta(req,res)
)
adminRouter.route('/prihvatiZahtevRadnaMesta').post(
    (req,res)=>new AdminController().prihvatiZahtevRadnaMesta(req,res)
)
adminRouter.route('/odbijZahtevRadnaMesta').post(
    (req,res)=>new AdminController().odbijZahtevRadnaMesta(req,res)
)
export default adminRouter;