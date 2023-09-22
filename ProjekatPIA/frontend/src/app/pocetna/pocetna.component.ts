import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { ActivatedRoute, Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private korisnikServis:KorisnikService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.korisnikServis.dohvSveKorisnike().subscribe((sviKor:Korisnik[])=>{
      this.pretragaPoAdresi="";
      this.pretragaPoNazivu="";
      for(let kor of sviKor){
        if(kor.odobren&&kor.tip=='agencija'){
          this.agencije.push(kor);
        }
      }
    })
  }

  korIme:string;
  lozinka:string;
  poruka:string;
  agencije:Korisnik[]=[];
  pretragaPoNazivu:string;
  pretragaPoAdresi:string;

  login(){
    this.korisnikServis.login(this.korIme,this.lozinka).subscribe((kor:Korisnik)=>{
      if(kor!=null&&kor.odobren){
        sessionStorage.setItem('korisnik',JSON.stringify(kor));
        if(kor.tip=='agencija'){
          this.router.navigate(['agencija']);
        }
        else{
          this.router.navigate(['klijent']);
        }
      }
      else{
        this.poruka="Pogresni kredencijali!";
      }
    })
  }
  detalji(agenicja:Korisnik){
    this.router.navigate(['detaljiAgencija',{agencija:agenicja.korisnickoIme, tip:'korisnik'}]);
  }
  pretrazi(){
    this.korisnikServis.pretraziAgencije(this.pretragaPoNazivu,this.pretragaPoAdresi).subscribe((agen:Korisnik[])=>{
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

}
