import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KlijentService } from '../klijent.service';
import { Router } from '@angular/router';
import { Objekat } from '../models/objekat';

@Component({
  selector: 'app-agencije-klijent',
  templateUrl: './agencije-klijent.component.html',
  styleUrls: ['./agencije-klijent.component.css']
})
export class AgencijeKlijentComponent implements OnInit {

  constructor(private klijentService:KlijentService,private router:Router) { }

  error:string;
  agencije:Korisnik[]=[]
  pretragaPoNazivu:string;
  pretragaPoAdresi:string;
  korisnik:Korisnik;
  objekti:Objekat[]=[];
  ngOnInit(): void {
    this.korisnik=JSON.parse(sessionStorage.getItem('korisnik'));
    this.pretragaPoAdresi="";
    this.pretragaPoNazivu="";
    this.klijentService.dohvatiSveAgencije().subscribe((resp:Korisnik[])=>{
      this.agencije=resp;
      this.klijentService.dohvatiObjekteZaRenoviranje(this.korisnik.korisnickoIme).subscribe((resp:Objekat[])=>{
        //tu se nalaze objetki koji se trenutno ne renoviraju-> ukoliko takvi postoje
        this.objekti=resp;
      })
    })
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  pretrazi(){
    this.klijentService.pretraziAgencije(this.pretragaPoNazivu,this.pretragaPoAdresi).subscribe((agen:Korisnik[])=>{
      this.pretragaPoAdresi="";
      this.pretragaPoNazivu="";
      this.agencije=[];
      for(let kor of agen){
        if(kor.odobren&&kor.tip=='agencija'){
          this.agencije.push(kor);
        }
      }
    })
  }
  sortirajRastuce(nacin){
    if(nacin=='naziv'){
      this.agencije.sort((a1,a2)=>{
        return a1.nazivAgencije<a2.nazivAgencije? -1:1
      })
    }
    else{
      this.agencije.sort((a1,a2)=>{
        return a1.adresaAgencije<a2.adresaAgencije? -1:1
      })
    }
  }
  sortirajOpadajuce(nacin){
    if(nacin=='naziv'){
      this.agencije.sort((a1,a2)=>{
        return a1.nazivAgencije<a2.nazivAgencije? 1:-1
      })
    }
    else{
      this.agencije.sort((a1,a2)=>{
        return a1.adresaAgencije<a2.adresaAgencije? 1:-1
      })
    }
  }
  detalji(agenicja:Korisnik){
    this.router.navigate(['detaljiAgencija',{agencija:agenicja.korisnickoIme, tip:'klijent'}]);
  }
  nazadDoMenija(){
    this.router.navigate(['klijent']);
  }
  saradnja(agencija:Korisnik){
    if(this.objekti==null||this.objekti.length<=0){
      this.error="Nemate objekat za koji mozete zatraziti saradnju"
      return;
    }
    this.router.navigate(['zahtevSaradnja',{agencija:agencija.korisnickoIme,korisnik:this.korisnik.korisnickoIme}])
  }
}
