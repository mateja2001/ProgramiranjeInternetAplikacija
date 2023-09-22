import { Prostorija } from "./prostorija";
export class Objekat{
    _id:string;
    korisnik:string;
    tip:string;
    adresa:string;
    brojProstorija:number; //maksimum 3
    kvadratura:number;
    renoviranje:boolean //polje koje govori da li se objekat trenutno renovira
    prostorije:Array<Prostorija>//iz tog podatke ce se crtati skica
}