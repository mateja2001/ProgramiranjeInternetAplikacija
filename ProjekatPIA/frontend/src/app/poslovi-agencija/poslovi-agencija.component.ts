import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Posao } from '../models/posao';
import { Objekat } from '../models/objekat';
import { AgencijaService } from '../agencija.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-poslovi-agencija',
  templateUrl: './poslovi-agencija.component.html',
  styleUrls: ['./poslovi-agencija.component.css']
})
export class PosloviAgencijaComponent implements OnInit {

  constructor(private router:Router, private agencijaService:AgencijaService) { }
  zahtevi:Posao[]=[];
  aktivniPoslovi:Posao[]=[];
  objekti:Objekat[]=[];
  agencija:Korisnik;
  korisnici:Korisnik[]=[];
  ngOnInit(): void {
    this.agencija=JSON.parse(sessionStorage.getItem('korisnik'))
    this.agencijaService.dohvatiPoslove(this.agencija.korisnickoIme).subscribe((posl:Posao[])=>{
      //treba dovuci i podatke o klijentu i podatke o objektu
      for(let p of posl){
        if(p.status=='zahtev'&&p.prihvacen!=false){
          this.zahtevi.push(p)
        }
        if(p.status=='aktivan'){
          this.aktivniPoslovi.push(p);
        }
      }
      this.agencijaService.dohvatiKorisnike().subscribe((kor:Korisnik[])=>{
        this.korisnici=kor;
        this.agencijaService.dohvatiObjekte().subscribe((obj:Objekat[])=>{
          this.objekti=obj;
        })
      })

    })
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  nazadDoMenija(){
    this.router.navigate(['agencija']);
  }
  podaciKorisnik(korIme){
    for(let k of this.korisnici){
      if(k.korisnickoIme==korIme){
        let s=k.ime+" "+k.prezime+'\n'+'tel: '+ k.telefon;
        return s
      }
    }
    return null;
  }
  podaciObjekat(id){
    for(let o of this.objekti){
      if(o._id==id){
        let s='Kvadratura: '+o.kvadratura+'\n'+o.tip+'-'+o.adresa;
        return s;
      }
    }
    return null;
  }
  prihvatiZahtev(zahtev:Posao){
    this.router.navigate(['prihvatiZahtev',{zahtev:JSON.stringify(zahtev)}]);
  }
  prikaziNapredak(posao:Posao){
    this.router.navigate(['posaoNapredak',{posao:posao._id}]);
  }
  
}
