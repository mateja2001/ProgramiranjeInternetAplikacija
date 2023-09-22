import express from 'express'
import { KorisnikController } from '../controllers/korisnik.controller';

const korisnikRouter=express.Router();

korisnikRouter.route('/login').post(
    (req,res)=>new KorisnikController().login(req,res)
)
korisnikRouter.route('/sviKorisnici').get(
    (req,res)=>new KorisnikController().dohvSveKorisnike(req,res)
)
korisnikRouter.route('/registracija').post(
    (req,res)=>new KorisnikController().registracijaKorisnika(req,res)
)
korisnikRouter.route('/pretraziAgencije').post(
    (req,res)=>new KorisnikController().pretraziAgencije(req,res)
)
korisnikRouter.route('/dohvatiKomentare').post(
    (req,res)=>new KorisnikController().dohvatiKomentare(req,res)
)
korisnikRouter.route('/promeniLozinku').post(
    (req,res)=>new KorisnikController().promeniLozinku(req,res)
)
korisnikRouter.route('/dohvKorisnika').post(
    (req,res)=>new KorisnikController().dohvKorisnika(req,res)
)
export default korisnikRouter;