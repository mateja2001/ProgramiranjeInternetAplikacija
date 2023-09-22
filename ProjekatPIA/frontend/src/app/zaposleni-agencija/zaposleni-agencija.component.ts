import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Zaposleni } from '../models/zaposleni';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { KorisnikService } from '../korisnik.service';
import { Radnik } from '../models/radnik';
import { Zahtev } from '../models/zahtev';

@Component({
  selector: 'app-zaposleni-agencija',
  templateUrl: './zaposleni-agencija.component.html',
  styleUrls: ['./zaposleni-agencija.component.css']
})
export class ZaposleniAgencijaComponent implements OnInit {

  constructor(private route:ActivatedRoute, private adminService:AdminService, private router:Router, private korisnikService:KorisnikService) { }
  agencija:Korisnik=new Korisnik();
  zaposleni:Zaposleni=new Zaposleni();
  zap:number;
  povecaj:number;
  smanji:number;
  error:string;
  korIme:string;
  admin:Korisnik=new Korisnik();
  zahtevRadnaMesta:Zahtev=new Zahtev();
  radnici:Radnik[]=[];
  ngOnInit(): void {
    this.zap=0;
    this.povecaj=0;
    this.smanji=0;
    this.error=null;
    this.radnici=[];
    this.admin=JSON.parse(sessionStorage.getItem('admin'));
    this.korIme=this.route.snapshot.paramMap.get('agencija');
    this.korisnikService.dohvatiKorisnika(this.korIme).subscribe((resp:Korisnik)=>{
      this.agencija=resp;
      this.adminService.dohvatiZaposlene(this.agencija.korisnickoIme).subscribe((zaps:Zaposleni)=>{
        this.zaposleni=zaps;
        this.adminService.dohvatiRadnikeAgencije(this.agencija.korisnickoIme).subscribe((rad:Radnik[])=>{
          this.radnici=rad;
          this.adminService.dohvatiZahtevRadnaMesta(this.korIme).subscribe((z:Zahtev)=>{
            this.zahtevRadnaMesta=z;
          })
        })
      })
    })
    
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  nazad(){
    this.router.navigate(['admin']);
  }
  dodajRadnika(){
    this.router.navigate(['dodajRadnika',{agencija:this.korIme}]);
  }
  azurirajRadnika(radnik :Radnik){
    this.router.navigate(['azurirajRadnika',{radnik:JSON.stringify(radnik)}]);
  }
  obrisiRadnika(radnik: Radnik){
    this.adminService.obrisiRadnika(radnik._id,this.agencija.korisnickoIme).subscribe((resp)=>{
      if(resp['message']=='ok'){
        this.ngOnInit();
      }
    })
  }
  prihvatiZahtevRadnaMesta(){
    this.adminService.prihvatiZahtevRadnaMesta(this.agencija.korisnickoIme,this.zahtevRadnaMesta.brojMesta,this.zaposleni).subscribe((resp)=>{
      if(resp['message']=='ok'){
        this.ngOnInit();
      }
    })
  }
  odbijZahtevRadnaMesta(){
    this.adminService.odbijZahtevRadnaMesta(this.agencija.korisnickoIme).subscribe((resp)=>{
      if(resp['message']=='ok'){
        this.ngOnInit();
      }
    })
  }
}
