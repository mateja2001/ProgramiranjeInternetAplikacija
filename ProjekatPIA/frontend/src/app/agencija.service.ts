import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgencijaService {

  constructor(private http:HttpClient) { }
  uri='http://localhost:4000';

  azurirajPodatkeISliku(korisnik,slika,adresa,opis,naziv,mejl,telefon){
    const data={
      korisnik:korisnik,
      slika:slika,
      adresa:adresa,
      opis:opis,
      naziv:naziv,
      mejl:mejl,
      telefon:telefon
    }
    return this.http.post(`${this.uri}/agencija/azurirajPodatkeISliku`,data);
  }
  azurirajPodatke(korisnik,adresa,opis,naziv,mejl,telefon){
    const data={
      korisnik:korisnik,
      adresa:adresa,
      opis:opis,
      naziv:naziv,
      mejl:mejl,
      telefon:telefon
    }
    return this.http.post(`${this.uri}/agencija/azurirajPodatke`,data);
  }
  dohvatiPoslove(agencija){
    const data={
      agencija:agencija
    }
    return this.http.post(`${this.uri}/agencija/dohvatiPoslove`,data);
  }
  dohvatiObejkat(id){
    const data={
      id:id
    }
    return this.http.post(`${this.uri}/agencija/dohvatiObjekat`,data);
  }
  dohvatiKorisnika(korIme){
    const data={
      korIme:korIme
    }
    return this.http.post(`${this.uri}/agencija/dohvatiKorisnika`,data);
  }
  dohvatiObjekte(){
    return this.http.get(`${this.uri}/agencija/dohvatiObjekte`);
  }
  dohvatiKorisnike(){
    return this.http.get(`${this.uri}/agencija/dohvatiKorisnike`);
  }
  odbijZahtev(id,idO){
    const data={
      id:id,
      idO:idO
    }
    return this.http.post(`${this.uri}/agencija/odbijZahtev`,data);
  }
  prihvatiZahtev(id, ponuda){
    const data={
      id:id,
      ponuda:ponuda
    }
    return this.http.post(`${this.uri}/agencija/prihvatiZahtev`,data);
  }
  dohvatiZaposlene(agencija){
    const data={
      agencija:agencija
    }
    return this.http.post(`${this.uri}/agencija/dohvZaposlene`,data);
  }
  dodeliRadnike(idPosla,radnici,agencija,preostaliRad){
    const data={
      idPosla:idPosla,
      radnici:radnici,
      agencija:agencija,
      preostaliRad:preostaliRad
    }
    return this.http.post(`${this.uri}/agencija/dodeliRadnike`,data);
  }
  dohvatiPosao(idPosla){
    const data={
      idPosla:idPosla
    }
    return this.http.post(`${this.uri}/agencija/dohvatiPosao`,data);
  }
  izmeniObjekat(objekat){
    const data={
      objekat:objekat
    }
    return this.http.post(`${this.uri}/agencija/izmeniObjekat`,data);
  }
  oslobodiRadnike(idPosla,agencija,brojZauzetih, objekat){
    const data={
      idPosla:idPosla,
      agencija:agencija,
      brojZauzetih:brojZauzetih,
      objekat:objekat
    }
    return this.http.post(`${this.uri}/agencija/oslobodiRadnike`,data);
  }
  dohvatiRadnikeAgencije(agencija){
    const data={
      agencija:agencija
    }
    return this.http.post(`${this.uri}/agencija/dohvatiRadnike`,data);
  }
  obrisiRadnika(id,agencija){
    const data={
      id:id,
      agencija
    }
    return this.http.post(`${this.uri}/agencija/obrisiRadnika`,data);
  }
  azurirajRadnika(radnik){
    const data={
      radnik:radnik
    }
    return this.http.post(`${this.uri}/agencija/azurirajRadnika`,data);
  }
  dodajRadnika(agencija,radnik){
    const data={
      agencija:agencija,
      radnik:radnik,
    }
    return this.http.post(`${this.uri}/agencija/dodajRadnike`,data);
  }
  dohvatiSlobodneRadnikeAgencije(agencija){
    const data={
      agencija:agencija
    }
    return this.http.post(`${this.uri}/agencija/dohvatiSlobodneRadnike`,data);
  }
  uposliRadnika(idRadnika,objekat){
    const data={
      idRadnika:idRadnika,
      objekat:objekat
    }
    return this.http.post(`${this.uri}/agencija/uposliRadnika`,data);
  }
  posaljiZahtevRadnaMesta(agencija,brojMesta){
    const data={
      agencija:agencija,
      brojMesta:brojMesta
    }
    return this.http.post(`${this.uri}/agencija/zahtevRadnaMesta`,data);
  }
  dohvatiZahtev(agencija){
    const data={
      agencija:agencija
    }
    return this.http.post(`${this.uri}/agencija/dohvZahtevRadnaMesta`,data);
  }
}
