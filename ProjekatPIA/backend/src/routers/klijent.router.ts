import express from 'express'
import { KlijentController } from '../controllers/klijent.controller';

const klijentRouter=express.Router();

klijentRouter.route('/azurirajPodatke').post(
    (req,res)=>new KlijentController().azurirajPodatke(req,res)
)
klijentRouter.route('/azurirajPodatkeISliku').post(
    (req,res)=>new KlijentController().azurirajPodatkeISliku(req,res)
)
klijentRouter.route('/dohvatiObjekte').post(
    (req,res)=>new KlijentController().dohvatiObjekte(req,res)
)
klijentRouter.route('/dodajObjekat').post(
    (req,res)=>new KlijentController().dodajObjekat(req,res)
)
klijentRouter.route('/obrisiObjekat').post(
    (req,res)=>new KlijentController().obrisiObjekat(req,res)
)
klijentRouter.route('/izmeniObjekat').post(
    (req,res)=>new KlijentController().izmeniObjekat(req,res)
)
klijentRouter.route('/sveAgencije').get(
    (req,res)=>new KlijentController().dohvatiSveAgencije(req,res)
)
klijentRouter.route('/pretraziAgencije').post(
    (req,res)=>new KlijentController().pretraziAgencije(req,res)
)
klijentRouter.route('/objektiZaRenoviranje').post(
    (req,res)=>new KlijentController().dohvatiObjekteZaRenoviranje(req,res)
)
klijentRouter.route('/zahtevSaradnja').post(
    (req,res)=>new KlijentController().zahtevZaSaradnjom(req,res)
)
klijentRouter.route('/dohvatiPoslove').post(
    (req,res)=>new KlijentController().dohvatiPosloveKlijenta(req,res)
)
klijentRouter.route('/dohvatiObjekat').post(
    (req,res)=>new KlijentController().dohvatiObjekat(req,res)
)
klijentRouter.route('/platiPosao').post(
    (req,res)=>new KlijentController().platiPosao(req,res)
)
klijentRouter.route('/dohvatiKorisnika').post(
    (req,res)=>new KlijentController().dohvatiKorisnika(req,res)
)
klijentRouter.route('/odbijPonudu').post(
    (req,res)=>new KlijentController().odbijPonudu(req,res)
)
klijentRouter.route('/prihvatiPonudu').post(
    (req,res)=>new KlijentController().prihvatiPonudu(req,res)
)
klijentRouter.route('/dohvatiKomentar').post(
    (req,res)=>new KlijentController().dohvatiKomentar(req,res)
)
klijentRouter.route('/dodajKomentar').post(
    (req,res)=>new KlijentController().ostaviKomentar(req,res)
)
klijentRouter.route('/izmeniKomentar').post(
    (req,res)=>new KlijentController().izmeniKomentar(req,res)
)
klijentRouter.route('/obrisiKomentar').post(
    (req,res)=>new KlijentController().obirisiKomentar(req,res)
)
klijentRouter.route('/zahtevOtkazivanje').post(
    (req,res)=>new KlijentController().zahtevOtkazivanje(req,res)
)
export default klijentRouter;