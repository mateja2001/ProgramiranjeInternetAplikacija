import express from 'express'
import { AgencijaController } from '../controllers/agencija.controller';

const agencijaRouter=express.Router();

agencijaRouter.route('/azurirajPodatke').post(
    (req,res)=>new AgencijaController().azurirajPodatke(req,res)
)
agencijaRouter.route('/azurirajPodatkeISliku').post(
    (req,res)=>new AgencijaController().azurirajPodatkeISliku(req,res)
)
agencijaRouter.route('/dohvatiPoslove').post(
    (req,res)=>new AgencijaController().dohvatiPoslove(req,res)
)
agencijaRouter.route('/dohvatiObjekat').post(
    (req,res)=>new AgencijaController().dohvatiObjekat(req,res)
)
agencijaRouter.route('/dohvatiKorisnika').post(
    (req,res)=>new AgencijaController().dohvatiKorisnika(req,res)
)
agencijaRouter.route('/dohvatiKorisnike').get(
    (req,res)=>new AgencijaController().dohvatiKorisnike(req,res)
)
agencijaRouter.route('/dohvatiObjekte').get(
    (req,res)=>new AgencijaController().dohvatiObjekte(req,res)
)
agencijaRouter.route('/odbijZahtev').post(
    (req,res)=>new AgencijaController().odbijZahtev(req,res)
)
agencijaRouter.route('/prihvatiZahtev').post(
    (req,res)=>new AgencijaController().prihvatiZahtev(req,res)
)
agencijaRouter.route('/dohvZaposlene').post(
    (req,res)=>new AgencijaController().dohvZaposlene(req,res)
)
agencijaRouter.route('/dodeliRadnike').post(
    (req,res)=>new AgencijaController().dodeliRadnike(req,res)
)
agencijaRouter.route('/dohvatiPosao').post(
    (req,res)=>new AgencijaController().dohvatiPosao(req,res)
)
agencijaRouter.route('/izmeniObjekat').post(
    (req,res)=>new AgencijaController().izmeniObjekat(req,res)
)
agencijaRouter.route('/oslobodiRadnike').post(
    (req,res)=>new AgencijaController().oslobodiRadnike(req,res)
)
agencijaRouter.route('/dohvatiRadnike').post(
    (req,res)=>new AgencijaController().dohvatiRadnike(req,res)
)
agencijaRouter.route('/obrisiRadnika').post(
    (req,res)=>new AgencijaController().obrisiRadnika(req,res)
)
agencijaRouter.route('/azurirajRadnika').post(
    (req,res)=>new AgencijaController().azurirajRadnika(req,res)
)
agencijaRouter.route('/dodajRadnike').post(
    (req,res)=>new AgencijaController().dodajRadnike(req,res)
)
agencijaRouter.route('/dohvatiSlobodneRadnike').post(
    (req,res)=>new AgencijaController().dohvatiSlobodneRadnike(req,res)
)
agencijaRouter.route('/uposliRadnika').post(
    (req,res)=>new AgencijaController().uposliRadnika(req,res)
)
agencijaRouter.route('/zahtevRadnaMesta').post(
    (req,res)=>new AgencijaController().zahtevRadnaMesta(req,res)
)
agencijaRouter.route('/dohvZahtevRadnaMesta').post(
    (req,res)=>new AgencijaController().dohvatiZahtev(req,res)
)
export default agencijaRouter;