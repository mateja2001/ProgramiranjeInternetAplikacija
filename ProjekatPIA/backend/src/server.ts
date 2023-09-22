import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import korisnikRouter from './routers/korisnik.router';
import klijentRouter from './routers/klijent.router';
import agencijaRouter from './routers/agencija.router';
import adminRouter from './routers/admin.router';
const app = express();
app.use(cors());
app.use(express.json());
//to podencijalno treba promeniti na localhost:
mongoose.connect('mongodb://127.0.0.1:27017/ProjekatPIA');
const connection=mongoose.connection
connection.once('open',()=>{
    console.log('db connected')
})
const router=express.Router();
router.use('/korisnik',korisnikRouter);
router.use('/klijent',klijentRouter);
router.use('/agencija',agencijaRouter);
router.use('/admin',adminRouter);
app.use('/',router);
app.listen(4000, () => console.log(`Express server running on port 4000`));