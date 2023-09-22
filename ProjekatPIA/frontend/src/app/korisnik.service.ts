import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {
  
  constructor(private http:HttpClient) { }

  uri='http://localhost:4000';

  login(korIme,lozinka){
    const data={
      korIme:korIme,
      lozinka:lozinka
    }
    
    return this.http.post(`${this.uri}/korisnik/login`,data);
  }
  dohvSveKorisnike(){
    return this.http.get(`${this.uri}/korisnik/sviKorisnici`);
  }
  registracijaKorisnika(data){
    return this.http.post(`${this.uri}/korisnik/registracija`,data);
  }
  pretraziAgencije(naziv,adresa){
    const data={
      naziv:naziv,
      adresa:adresa
    }
    return this.http.post(`${this.uri}/korisnik/pretraziAgencije`,data);
  }
  dohvatiKomentare(agencija){
    const data={
      agencija:agencija
    }
    return this.http.post(`${this.uri}/korisnik/dohvatiKomentare`,data);
  }
  promeniLozinku(korisnik,novaLozinka){
    const data={
      korisnik:korisnik,
      novaLozinka:novaLozinka
    }
    return this.http.post(`${this.uri}/korisnik/promeniLozinku`,data);
  }
  dohvatiKorisnika(korisnik){
    const data={
      korisnik:korisnik
    }
    return this.http.post(`${this.uri}/korisnik/dohvKorisnika`,data);
  }
}
