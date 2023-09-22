import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KlijentService {

  constructor(private http:HttpClient) { }

  uri='http://localhost:4000';

  azurirajPodatkeISliku(korisnik,slika,ime,prezime,mejl,telefon){
    const data={
      korisnik:korisnik,
      slika:slika,
      ime:ime,
      prezime:prezime,
      mejl:mejl,
      telefon:telefon
    }
    return this.http.post(`${this.uri}/klijent/azurirajPodatkeISliku`,data);
  }
  azurirajPodatke(korisnik,ime,prezime,mejl,telefon){
    const data={
      korisnik:korisnik,
      ime:ime,
      prezime:prezime,
      mejl:mejl,
      telefon:telefon
    }
    return this.http.post(`${this.uri}/klijent/azurirajPodatke`,data);
  }
  dohvatiObjekte(korisnik){
    const data={
      korisnik:korisnik
    }
    return this.http.post(`${this.uri}/klijent/dohvatiObjekte`,data);
  }
  dodajObjekat(objekat){
    const data={
      objekat:objekat,
    }
    return this.http.post(`${this.uri}/klijent/dodajObjekat`,data);
  }
  obrisiObjekat(id){
    const data={
      id:id
    }
    return this.http.post(`${this.uri}/klijent/obrisiObjekat`,data);
  }
  izmeniObjekat(objekat){
    const data={
      objekat:objekat
    }
    return this.http.post(`${this.uri}/klijent/izmeniObjekat`,data);
  }
  dohvatiSveAgencije(){
    return this.http.get(`${this.uri}/klijent/sveAgencije`);
  }
  pretraziAgencije(naziv,adresa){
    const data={
      naziv:naziv,
      adresa:adresa
    }
    return this.http.post(`${this.uri}/klijent/pretraziAgencije`,data);
  }
  dohvatiObjekteZaRenoviranje(korisnik){
    const data={
      korisnik:korisnik
    }
    return this.http.post(`${this.uri}/klijent/objektiZaRenoviranje`,data);
  }
  posaljiZahtevZaSaradnjom(korisnik,objekat,agencija,datumPocetka,datumKraja){
    const data={
      korisnik:korisnik,
      objekat:objekat,
      agencija:agencija,
      datumPocetka:datumPocetka,
      datumKraja:datumKraja
    }
    return this.http.post(`${this.uri}/klijent/zahtevSaradnja`,data);
  }
  dohvatiPosloveKlijenta(korisnik){
    const data={
      korisnik:korisnik
    }
    return this.http.post(`${this.uri}/klijent/dohvatiPoslove`,data);
  }
  dohvatiObejkat(id){
    const data={
      id:id
    }
    return this.http.post(`${this.uri}/klijent/dohvatiObjekat`,data);
  }
  platiPosao(id){
    const data={
      id:id
    }
    return this.http.post(`${this.uri}/klijent/platiPosao`,data);
  }
  dohvatiKorisnika(korIme){
    const data={
      korIme:korIme
    }
    return this.http.post(`${this.uri}/klijent/dohvatiKorisnika`,data);
  }
  odbijPonudu(idPosla, idObjekta){
    const data={
      idP:idPosla,
      idO:idObjekta
    }
    return this.http.post(`${this.uri}/klijent/odbijPonudu`,data);
  }
  prihvatiPonudu(idPosla){
    const data={
      id:idPosla
    }
    return this.http.post(`${this.uri}/klijent/prihvatiPonudu`,data);
  }
  dohvatiKomentar(idPosla){
    const data={
      idPosla:idPosla
    }
    return this.http.post(`${this.uri}/klijent/dohvatiKomentar`,data);
  }
  ostaviKomentar(idPosla,ocena,komentar,korisnik,agencija){
    const data={
      idPosla:idPosla,
      ocena:ocena,
      komentar:komentar,
      korisnik:korisnik,
      agencija:agencija
    }
    return this.http.post(`${this.uri}/klijent/dodajKomentar`,data);
  }
  izmeniKomentar(idPosla,ocena,komentar){
    const data={
      idPosla:idPosla,
      ocena:ocena,
      komentar:komentar
    }
    return this.http.post(`${this.uri}/klijent/izmeniKomentar`,data);
  }
  obrisiKomentar(idPosla){
    const data={
      idPosla:idPosla
    }
    return this.http.post(`${this.uri}/klijent/obrisiKomentar`,data);
  }
  zahtevZaOtkazivanje(idPosla,razlog){
    const data={
      idPosla:idPosla,
      razlog:razlog
    }
    return this.http.post(`${this.uri}/klijent/zahtevOtkazivanje`,data);
  }
  
}
