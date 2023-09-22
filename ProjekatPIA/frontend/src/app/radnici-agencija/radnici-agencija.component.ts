import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Zaposleni } from '../models/zaposleni';
import { Radnik } from '../models/radnik';
import { Router } from '@angular/router';
import { AgencijaService } from '../agencija.service';
import { Zahtev } from '../models/zahtev';

@Component({
  selector: 'app-radnici-agencija',
  templateUrl: './radnici-agencija.component.html',
  styleUrls: ['./radnici-agencija.component.css']
})
export class RadniciAgencijaComponent implements OnInit {

  constructor(private router:Router, private agencijaService:AgencijaService) { }

  agencija:Korisnik=new Korisnik();
  zaposleni:Zaposleni=new Zaposleni();
  radnici:Radnik[]=[];
  novaRadnaMesta:number;
  error:string;
  zahtev:Zahtev=new Zahtev();
  ngOnInit(): void {
    this.error=null;
    this.novaRadnaMesta=null;
    this.agencija=JSON.parse(sessionStorage.getItem('korisnik'));
    this.agencijaService.dohvatiZahtev(this.agencija.korisnickoIme).subscribe((zz:Zahtev)=>{
      this.zahtev=zz;
      this.agencijaService.dohvatiZaposlene(this.agencija.korisnickoIme).subscribe((zap:Zaposleni)=>{
        this.zaposleni=zap;
        if(zap!=null){
          this.agencijaService.dohvatiRadnikeAgencije(this.agencija.korisnickoIme).subscribe((rad:Radnik[])=>{
            this.radnici=rad;
          })
        }
      })
    })
  }
  obrisiRadnika(radnik: Radnik){
    this.agencijaService.obrisiRadnika(radnik._id,this.agencija.korisnickoIme).subscribe((resp)=>{
      if(resp['message']=='ok'){
        this.ngOnInit();
      }
    })
  }
  dodajRadnika(){
    this.router.navigate(['dodajRadnika',{agencija:this.agencija.korisnickoIme}]);
  }
  azurirajRadnika(radnik :Radnik){
    this.router.navigate(['azurirajRadnika',{radnik:JSON.stringify(radnik)}]);
  }
  nazadDoMenija(){
    this.router.navigate(['agencija']);
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  posaljiZahtev(){
    if(this.novaRadnaMesta==null||this.novaRadnaMesta==0){
      this.error="Broj radnih mesta mora biti veci od 0!";
      return;
    }
    this.agencijaService.posaljiZahtevRadnaMesta(this.agencija.korisnickoIme,this.novaRadnaMesta ).subscribe((resp)=>{
      if(resp['message']=='ok'){
        this.ngOnInit();
      }
    })
  }

}
