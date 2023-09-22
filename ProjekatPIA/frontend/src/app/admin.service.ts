import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  uri='http://localhost:4000';

  login(korIme,lozinka){
    const data={
      korIme:korIme,
      lozinka:lozinka
    }
    
    return this.http.post(`${this.uri}/admin/login`,data);
  }
  dohvSveKorisnike(){
    return this.http.get(`${this.uri}/admin/dohvSveKorisnike`);
  }
  prihvatiZahtevReg(korIme){
    const data={
      korIme:korIme
    }
    return this.http.post(`${this.uri}/admin/prihvatiZahtevReg`,data);
  }
  odbijZahtevReg(korIme){
    const data={
      korIme:korIme
    }
    return this.http.post(`${this.uri}/admin/odbijZahtevReg`,data);
  }
  dohvatiZaposlene(korIme){
    const data={
      korIme:korIme
    }
    return this.http.post(`${this.uri}/admin/dohvatiZaposlene`,data);
  }
  dodajRadnika(agencija,radnik,zaposleni){
    const data={
      agencija:agencija,
      radnik:radnik,
      zaposleni:zaposleni
    }
    return this.http.post(`${this.uri}/admin/dodajRadnike`,data);
  }
  povecajBrojRadnika(agencija,radnici,trenutno){
    const data={
      agencija:agencija,
      radnici:radnici,
      trenutno:trenutno
    }
    return this.http.post(`${this.uri}/admin/povecajBrojRadnika`,data);
  }
  smanjiBrojRadnika(agencija,radnici,trenutno){
    const data={
      agencija:agencija,
      radnici:radnici,
      trenutno:trenutno
    }
    return this.http.post(`${this.uri}/admin/smanjiBrojRadnika`,data);
  }
  dohvatiSvePoslove(){
    return this.http.get(`${this.uri}/admin/dohvSvePoslove`);
  }
  prihvatiZahtevOtkazivanje(idObj,idPos,agencija,brRadnika){
    const data={
      idObj:idObj,
      idPos:idPos,
      agencija:agencija,
      brRadnika:brRadnika
    }
    return this.http.post(`${this.uri}/admin/prihvatiZahtevOtkazivanje`,data);
  }
  prihvatiZahtevOtkazivanjeBezZapolsenih(idObj,idPos){
    const data={
      idObj:idObj,
      idPos:idPos
    }
    return this.http.post(`${this.uri}/admin/prihvatiZahtevOtkazivanjeBezZaposlenih`,data);
  }
  odbijZahtevOtkazivanje(idPos){
    const data={
      idPos:idPos
    }
    return this.http.post(`${this.uri}/admin/odbijZahtevOtkazivanje`,data);
  }
  obrisiKorisnika(korIme){
    const data={
      korIme:korIme
    }
    return this.http.post(`${this.uri}/admin/obrisiKorisnika`,data);
  }
  dohvatiRadnikeAgencije(agencija){
    const data={
      agencija:agencija
    }
    return this.http.post(`${this.uri}/admin/dohvatiRadnike`,data);
  }
  obrisiRadnika(id,agencija){
    const data={
      id:id,
      agencija
    }
    return this.http.post(`${this.uri}/admin/obrisiRadnika`,data);
  }
  azurirajRadnika(radnik){
    const data={
      radnik:radnik
    }
    return this.http.post(`${this.uri}/admin/azurirajRadnika`,data);
  }
  dohvatiZahtevRadnaMesta(agencija){
    const data={
      agencija:agencija
    }
    return this.http.post(`${this.uri}/admin/dohvZahtevRadnaMesta`,data);
  }
  prihvatiZahtevRadnaMesta(agencija,brojMesta,zaposleni){
    const data={
      agencija:agencija,
      brojMesta:brojMesta,
      zaposleni:zaposleni
    }
    return this.http.post(`${this.uri}/admin/prihvatiZahtevRadnaMesta`,data);
  }
  odbijZahtevRadnaMesta(agencija){
    const data={
      agencija:agencija
    }
    return this.http.post(`${this.uri}/admin/odbijZahtevRadnaMesta`,data);
  }
  
}
