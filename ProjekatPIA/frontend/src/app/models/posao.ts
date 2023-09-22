export class Posao{
    _id:string
    korisnik:string;
    agencija:string;
    objekat:string; //idO
    prihvacen:boolean; //null kada je zahtev, true/false kada se prihvati/odbije
    datumPocetka:string;
    datumKraja:string;
    status:string;//aktivan,zavrsen,zahtev
    placeno:boolean;//da li je korisnik platio-->kada plati-> posao postaje zavrsen
    ponuda:number;// nadoknada koja treba da se plati-> zadaje agencija
    razlogOtkazivanja:string;
    brojRadnika:number;
}