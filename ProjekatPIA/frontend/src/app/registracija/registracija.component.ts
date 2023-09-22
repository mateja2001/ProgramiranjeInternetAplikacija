import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../korisnik.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private korisnikService:KorisnikService, private router:Router, private route:ActivatedRoute) { }

  korisnickoIme:string;
  lozinka:string;
  potvrdaLozinke:string;
  telefon:string;
  mejl:string;
  tip:string;
  ime:string;
  prezime:string;
  nazivAgencije:string;
  adresaAgencije:string;
  maticniBrAgencije:string;
  opisAgencije:string;
  error:string;
  errorSlika:string;
  potvrda:string;
  url:any;
  admin:string;

  sviKorisnici:Korisnik[];
  ngOnInit(): void {
    this.error="";
    this.potvrda="";
    this.korisnickoIme,this.lozinka,this.potvrdaLozinke,this.telefon,this.mejl,this.tip,this.ime,
    this.prezime,this.nazivAgencije,this.adresaAgencije,this.maticniBrAgencije,this.opisAgencije=null;
    this.url=null;
    this.admin=this.route.snapshot.paramMap.get('admin');
    this.korisnikService.dohvSveKorisnike().subscribe((sviKor:Korisnik[])=>{
      this.sviKorisnici=sviKor;
    })
  }

  //sluzi za slucaj da korisnik popuni podatke pa obrise jedan->ostaje prazan string
  finalnaProvera(){
    if(this.korisnickoIme==""||this.lozinka==""||this.potvrdaLozinke==""||this.telefon==null||this.mejl==null){
      this.error="Morate uneti sve podatke!"
      return false;
    }
    if(this.tip=='klijent'){
      if(this.ime==""||this.prezime==""){
        this.error="Morate uneti sve podatke!"
        return false;
      }
    }else{
      if(this.nazivAgencije==""||this.adresaAgencije==""||this.maticniBrAgencije==""||this.opisAgencije==""){
        this.error="Morate uneti sve podatke!"
        return false;
      }
    }
    return true;
  }
  //ako korisnik uopste nije ni pristupao polju-->vrednost polja je null
  inicijalnaProvera(){
    if(this.korisnickoIme==null||this.lozinka==null||this.potvrdaLozinke==null||this.telefon==null||this.mejl==null){
      this.error="Morate uneti sve podatke!"
      return false;
    }
    if(this.tip=='klijent'){
      if(this.ime==null||this.prezime==null){
        this.error="Morate uneti sve podatke!"
        return false;
      }
    }else{
      if(this.nazivAgencije==null||this.adresaAgencije==null||this.maticniBrAgencije==null||this.opisAgencije==null){
        this.error="Morate uneti sve podatke!"
        return false;
      }
    }
    return true;
  }
  nazad(){
    this.router.navigate(['admin']);
  }
  nazadGlavna(){
    this.router.navigate(['']);
  }
  posaljiZahtev(){
    let sablonLozinka=new RegExp(/^(?=.*[A-Z])(?=.*[!@#$%^&*()-=_+|;':",.<>/?])(?=.*[0-9])[A-Za-z][A-Za-z0-9!@#$%^&*()-=_+|;':",.<>/?]{6,11}$/);
    let sablonTelefon=new RegExp(/^\d+$/);
    let sablonMejl=new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    this.potvrda="";
    if(!this.inicijalnaProvera()){
       this.error="Morate uneti sve podatke!"
      return;
    }
    if(!this.finalnaProvera()){
      this.error="Morate uneti sve podatke!"
      return;
    }
    if(!sablonLozinka.test(this.lozinka)){
      this.error="Lozinka mora sadrzati bar jedno veliko slovo, jedan specijalni karakter i jedan broj, i mora pocinjati slovom. Duzina mora biti izmedju 7 i 12 karaktera.";
      return;
    }
    if(!sablonTelefon.test(this.telefon)){
      this.error="Kontakt telefon sme sadrzati samo cifre!";
      return;
    }
    if(!sablonMejl.test(this.mejl)){
      this.error="Mejl nije u ispravnom formatu!";
      return;
    }
    if(!sablonTelefon.test(this.maticniBrAgencije)&&this.tip=='agencija'){
      this.error="Maticni broj sme sadrzati samo cifre!";
      return;
    }
    if(this.lozinka!=this.potvrdaLozinke){
      this.error="Unete lozinke nisu iste!";
      return;
    }
    for(let k of this.sviKorisnici){
        if(k.korisnickoIme==this.korisnickoIme){
          this.error="Ovo korisnicko ime vec postoji!"
          return;
        }
    }
    for(let k of this.sviKorisnici){
        if(k.mejl==this.mejl){
          this.error="Ovaj mejl vec postoji!"
          return;
        }
    }
    //za slucaj da korisnik popuni pa obrise podatke->ostale "" u poljima

    const data={
      korisnickoIme:this.korisnickoIme,
      lozinka:this.lozinka,
      telefon:this.telefon,
      mejl:this.mejl,
      tip:this.tip,
      ime:this.ime,
      prezime:this.prezime,
      nazivAgencije:this.nazivAgencije,
      adresaAgencije:this.adresaAgencije,
      maticniBrAgencije:this.maticniBrAgencije,
      opisAgencije:this.opisAgencije,
      slika:this.url
    }
    this.korisnikService.registracijaKorisnika(data).subscribe((resp)=>{
      this.potvrda="Zahtev je uspesno poslat!";
      this.error="";
      alert(this.potvrda);
      if(this.admin!='admin'){
        this.router.navigate(['']);
      }
      else{
        this.router.navigate(['admin']);
      }
      // //moramo opet dovuci podatke da se ne bi desilo da korisnik 2 puta pritisne dugme za potvrdu
      // this.korisnikService.dohvSveKorisnike().subscribe((sviKor:Korisnik[])=>{
      //   this.sviKorisnici=sviKor;
        
      // })
    })
  }
  ucitajSliku(event: any) { 
		
      var mimeType = event.target.files[0].type;
		
      if (mimeType.match(/image\/*/) == null) {
        this.errorSlika = "Tip fajla mora biti slika!";
        this.url=null;
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        var img = new Image();
        img.src=_event.target.result.toString();
        img.onload = (event_img: any)=>{
          if(img.width > 300 || img.width < 100 || img.height > 300 || img.height < 100)
          {
            this.errorSlika="Minimalna velicina slike je 100x100px, a maksimalna 300x300px!";
            this.url=null;
            return;
          }}
        this.errorSlika = "";
        this.url=_event.target.result; 
      }
   
   
	}
}
