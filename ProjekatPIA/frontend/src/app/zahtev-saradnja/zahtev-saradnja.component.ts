import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { ActivatedRoute, Router } from '@angular/router';
import { Objekat } from '../models/objekat';
import { KlijentService } from '../klijent.service';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-zahtev-saradnja',
  templateUrl: './zahtev-saradnja.component.html',
  styleUrls: ['./zahtev-saradnja.component.css']
})
export class ZahtevSaradnjaComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router, private klijentService:KlijentService, private korisnikService:KorisnikService) { }

  agencija:Korisnik=new Korisnik();
  korisnickoIme:string;
  korisnik:Korisnik=new Korisnik();
  objekti:Objekat[]=[];
  idO:string;
  datumPocetka:Date;
  datumKraja:Date;
  error:string;
  ngOnInit(): void {
    this.datumPocetka=null;
    this.datumKraja=null;
    this.idO=null;
    this.korisnik=JSON.parse(sessionStorage.getItem('korisnik'));
    let korIme=this.route.snapshot.paramMap.get('agencija');
    this.korisnickoIme=this.route.snapshot.paramMap.get('korisnik');
    this.korisnikService.dohvatiKorisnika(korIme).subscribe((agen:Korisnik)=>{
      this.agencija=agen;
      this.klijentService.dohvatiObjekteZaRenoviranje(this.korisnickoIme).subscribe((resp:Objekat[])=>{
      this.objekti=resp;
   })
    })
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  posaljiZahtev(){
    if(this.idO==null||this.datumKraja==null||this.datumPocetka==null){
      this.error="Morate popuniti sve podatke!";
      return;
    }
    if(this.datumPocetka>this.datumKraja){
      this.error="Datum pocetka radova mora biti pre datuma kraja radova!";
      return;
    }
    let sad=new Date();
    if(this.datumPocetka.toString()<sad.toISOString().slice(0,10)){
      this.error="Datumi ne smeju biti u proslosti!";
      return;
    }
    this.error=null;
    //ukoliko je objekat pre toga bio renoviran, status svih soba se mora postaviti na 'ne radi se'
    this.klijentService.dohvatiObejkat(this.idO).subscribe((obj:Objekat)=>{
      for(let p of obj.prostorije){
        p.status='ne radi se';
      }
      this.klijentService.izmeniObjekat(obj).subscribe((resp)=>{
        if(resp['message']=='ok'){
          this.klijentService.posaljiZahtevZaSaradnjom(this.korisnickoIme,this.idO,this.agencija.korisnickoIme,this.datumPocetka.toString(),this.datumKraja.toString()).subscribe((resp)=>{
            if(resp['message']=='ok'){
              alert("Uspesno ste poslali zahtev za saradnjom!");
              this.nazadDoAgenicija();
            }
          })
        }
      })
    })
    
  }
  nazadDoAgenicija(){
    this.router.navigate(['agencijeKlijent'])
  }

}
