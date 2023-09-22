import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Zaposleni } from '../models/zaposleni';
import { Korisnik } from '../models/korisnik';
import { Radnik } from '../models/radnik';
import { AgencijaService } from '../agencija.service';

@Component({
  selector: 'app-dodaj-radnika',
  templateUrl: './dodaj-radnika.component.html',
  styleUrls: ['./dodaj-radnika.component.css']
})
export class DodajRadnikaComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router, private adminService:AdminService, private agencijaService:AgencijaService) { }
  ime:string;
  prezime:string;
  mejl:string;
  telefon:string;
  strucnost:string;
  error:string;
  korImeAgenicja:string;
  zaposleniAgencija:Zaposleni=new Zaposleni();
  agencija:Korisnik=new Korisnik();
  admin:Korisnik=new Korisnik();
  ngOnInit(): void {
    this.ime=null;
    this.prezime=null;
    this.mejl=null;
    this.telefon=null;
    this.strucnost=null;
    this.error=null;
    this.admin=JSON.parse(sessionStorage.getItem('admin'));
    this.agencija=JSON.parse(sessionStorage.getItem('korisnik'));
    if(this.admin!=null){
      //zaposleni sluze da vidimo da li agencija uopste ima radnih mesta,
      //ako nema treba da ih dodatno otvorimo, ako ima samo povecamo
      this.korImeAgenicja=this.route.snapshot.paramMap.get('agencija');
      this.adminService.dohvatiZaposlene(this.korImeAgenicja).subscribe((zap:Zaposleni)=>{
        this.zaposleniAgencija=zap;
      })
      //ako agencija dodaje radnike ne trebaju nam zaposleni jer oni sigurno postoje
      //->samo cemo inkrementirati zaposlene
    }
  }
  dodaj(){
    if(this.admin!=null){
      //kada admin dodaje radnike
      let sablonTelefon=new RegExp(/^\d+$/);
      if(this.ime==null||this.ime==""||this.prezime==null||this.prezime==""||this.mejl==null||this.mejl==""
      ||this.telefon==null||this.telefon==""||this.strucnost==null||this.strucnost==""){
        this.error="Morate uneti sve podatke!";
        return;
      }
      let sablonMejl=new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
      if(!sablonMejl.test(this.mejl)){
        this.error="Mejl nije u dobrom formatu!";
        return;
      }
      if(!sablonTelefon.test(this.telefon)){
        this.error="Kontakt telefon sme sadrzati samo cifre!";
        return;
      }
      let radnik=new Radnik();
      radnik.agencija=this.korImeAgenicja;
      radnik.ime=this.ime;
      radnik.prezime=this.prezime;
      radnik.mejl=this.mejl;
      radnik.telefon=this.telefon;
      radnik.strucnost=this.strucnost;
      this.adminService.dodajRadnika(this.korImeAgenicja,radnik,this.zaposleniAgencija).subscribe((resp)=>{
        if(resp['message']=='ok'){
          this.router.navigate(['zaposleniAgencija',{'agencija':this.korImeAgenicja}]);  
        }
      })
    }
    else{
      //kada agencija dodaje radnike
      let sablonTelefon=new RegExp(/^\d+$/);
      if(this.ime==null||this.ime==""||this.prezime==null||this.prezime==""||this.mejl==null||this.mejl==""
      ||this.telefon==null||this.telefon==""||this.strucnost==null||this.strucnost==""){
        this.error="Morate uneti sve podatke!";
        return;
      }
      if(!sablonTelefon.test(this.telefon)){
        this.error="Kontakt telefon sme sadrzati samo cifre!";
        return;
      }
      let sablonMejl=new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
      if(!sablonMejl.test(this.mejl)){
        this.error="Mejl nije u dobrom formatu!";
        return;
      }
      let radnik=new Radnik();
      radnik.agencija=this.agencija.korisnickoIme;
      radnik.ime=this.ime;
      radnik.prezime=this.prezime;
      radnik.mejl=this.mejl;
      radnik.telefon=this.telefon;
      radnik.strucnost=this.strucnost;
      this.agencijaService.dodajRadnika(this.agencija.korisnickoIme,radnik).subscribe((resp)=>{
        if(resp['message']=='ok'){
          this.router.navigate(['radniciAgencija']);  
        }
      })
    }
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  nazad(){
    this.router.navigate(['zaposleniAgencija',{agencija:this.korImeAgenicja}]);
  }
  nazadNaRadnike(){
    this.router.navigate(['radniciAgencija']);
  }

}
