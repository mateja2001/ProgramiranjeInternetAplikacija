import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Posao } from '../models/posao';
import { KlijentService } from '../klijent.service';
import { Korisnik } from '../models/korisnik';
import { Objekat } from '../models/objekat';

@Component({
  selector: 'app-poslovi-klijent',
  templateUrl: './poslovi-klijent.component.html',
  styleUrls: ['./poslovi-klijent.component.css']
})
export class PosloviKlijentComponent implements OnInit {

  constructor(private router:Router, private klijentService:KlijentService) { }

  sviPoslovi:Posao[]=[];
  zahtevi:Posao[]=[];
  aktivni:Posao[]=[];
  zavrseni:Posao[]=[];
  objekti:Objekat[]=[];
  korisnik:Korisnik;
  prikaz:string;
  ngOnInit(): void {
    this.aktivni=[];
    this.zavrseni=[];
    this.zahtevi=[];
    this.prikaz='svi';
    this.korisnik=JSON.parse(sessionStorage.getItem('korisnik'));
    this.klijentService.dohvatiPosloveKlijenta(this.korisnik.korisnickoIme).subscribe((resp:Posao[])=>{
      this.sviPoslovi=resp;
      this.klijentService.dohvatiObjekte(this.korisnik.korisnickoIme).subscribe((resp:Objekat[])=>{
        this.objekti=resp;
        for(let p of this.sviPoslovi){
          if(p.status=='zahtev'){
            this.zahtevi.push(p);
          }
          if(p.status=='zavrsen'){
            this.zavrseni.push(p);
          }
          if(p.status=='aktivan'){
            this.aktivni.push(p);
          }
        }
      })
    })
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  nazadDoMenija(){
    this.router.navigate(["klijent"]);
  }
  dohvatiAdresu(idObj){
    for(let o of this.objekti){
      if(o._id==idObj){
        return o.adresa;
      }
    }
    return null;
  }
  napredak(posao:Posao){
    this.klijentService.dohvatiObejkat(posao.objekat).subscribe((obj:Objekat)=>{
      this.router.navigate(['prikaziSkicu',{objekat:JSON.stringify(obj), skica:'napredak',idPosla:posao._id}]);
    })
  }
  ostaviKomentar(posao:Posao){
    this.router.navigate(['ostaviKomentar',{posao:JSON.stringify(posao)}])
  }
  pogledajPonudu(posao:Posao){
    let obj=null;
    for(let o of this.objekti){
      if(o._id==posao.objekat){
        obj=o;
        break;
      }
    }
    this.klijentService.dohvatiKorisnika(posao.agencija).subscribe((kor:Korisnik)=>{
      this.router.navigate(['pregledPonude',{objekat:JSON.stringify(obj),posao:JSON.stringify(posao),agencija:kor.nazivAgencije}]);
    })
  }
}
