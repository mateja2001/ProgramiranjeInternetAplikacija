import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { Posao } from '../models/posao';
import { Zaposleni } from '../models/zaposleni';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminService:AdminService, private router:Router) { }
  klijenti:Korisnik[]=[];
  agencije:Korisnik[]=[];
  zahteviKlijenti:Korisnik[]=[];
  zahteviAgencije:Korisnik[]=[];
  poslovi:Posao[]=[];
  zahteviOtkazivanje:Posao[]=[];
  admin:Korisnik;
  ngOnInit(): void {
    this.admin=JSON.parse(sessionStorage.getItem('admin'))
    this.klijenti=[];
    this.agencije=[];
    this.zahteviAgencije=[];
    this.zahteviKlijenti=[];
    this.poslovi=[];
    this.zahteviOtkazivanje=[];
    this.adminService.dohvSveKorisnike().subscribe((kor:Korisnik[])=>{
      for(let k of kor){
        if(k.tip=='agencija'&&k.odobren==true){
          this.agencije.push(k)
        }
        if(k.tip=='klijent'&&k.odobren==true){
          this.klijenti.push(k)
        }
        if(k.tip=='agencija'&&k.odobren==false&&k.odbijen==false){
          this.zahteviAgencije.push(k)
        }
        if(k.tip=='klijent'&&k.odobren==false&&k.odbijen==false){
          this.zahteviKlijenti.push(k)
        }
      }
      this.adminService.dohvatiSvePoslove().subscribe((pos:Posao[])=>{
        for(let p of pos){
          if(p.status!='u procesu otkazivanja'){
            this.poslovi.push(p);
          }
          else{
            this.zahteviOtkazivanje.push(p);
          }
        }
      })
    })
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  promenaLozinke(){
    this.router.navigate(['promenaLozinke',{korisnickoIme:this.admin.korisnickoIme, lozinka:this.admin.lozinka}]);
  }
  azurirajProfil(korisnik:Korisnik){
    this.router.navigate(['azuriranjeProfila',{korisnik:korisnik.korisnickoIme, admin:'admin'}]);
  }
  dodajKorisnika(){
    this.router.navigate(['registracija',{admin:'admin'}]);
  }
  prihvatiZahtev(korIme){
    this.adminService.prihvatiZahtevReg(korIme).subscribe((resp)=>{
      if(resp['message']=='ok'){
        this.ngOnInit();
      }
    })
  }
  odbijZahtev(korIme){
    this.adminService.odbijZahtevReg(korIme).subscribe((resp)=>{
      if(resp['message']=='ok'){
        this.ngOnInit();
      }
    })
  }
  zaposleniAgencija(a:Korisnik){
    this.router.navigate(['zaposleniAgencija',{agencija:a.korisnickoIme}]);
  }
  prihvatiZahtevOtkaz(p:Posao){
    this.adminService.dohvatiZaposlene(p.agencija).subscribe((z:Zaposleni)=>{
      if(z==null){
        //agencija nema radnike->dovoljno samo osloboditi objekat i obrisati posao
        this.adminService.prihvatiZahtevOtkazivanjeBezZapolsenih(p.objekat,p._id).subscribe((resp)=>{
          if(resp['message']=='ok'){
            this.ngOnInit();
          }
        })
      }
      else{
        //agencija ima radnike, moraju se osloboditi i radnici ukoliko postoje
        if(p.brojRadnika==null){
          this.adminService.prihvatiZahtevOtkazivanje(p.objekat,p._id,p.agencija,z.brojRadnika).subscribe((resp)=>{
            if(resp['message']=='ok'){
              this.ngOnInit();
            }
          })
        }
        else{
          this.adminService.prihvatiZahtevOtkazivanje(p.objekat,p._id,p.agencija,p.brojRadnika+z.brojRadnika).subscribe((resp)=>{
            if(resp['message']=='ok'){
              this.ngOnInit();
            }
          })
        }
      }
    })
  }
  odbijZahtevOtkaz(p:Posao){
    this.adminService.odbijZahtevOtkazivanje(p._id).subscribe((resp)=>{
      if(resp['message']=='ok'){
        this.ngOnInit();
      }
    })
  }
  obrisiKorisnika(korisnik:Korisnik){
    this.adminService.obrisiKorisnika(korisnik.korisnickoIme).subscribe((resp)=>{
      if(resp['message']=='ok'){
        this.ngOnInit();
      }
    })
  }
}
