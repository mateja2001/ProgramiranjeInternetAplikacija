import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { ActivatedRoute, Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { KlijentService } from '../klijent.service';
import { AgencijaService } from '../agencija.service';

@Component({
  selector: 'app-azuriranje-profila',
  templateUrl: './azuriranje-profila.component.html',
  styleUrls: ['./azuriranje-profila.component.css']
})
export class AzuriranjeProfilaComponent implements OnInit {

  constructor(private router:Router, private klijnetService:KlijentService, private korisnikService:KorisnikService, private agencijaService:AgencijaService, private route:ActivatedRoute) { }
  admin:string;
  korisnik:Korisnik=new Korisnik();
  adminKor:Korisnik=new Korisnik();
  ime:string;
  telefon:string;
  prezime:string;
  mejl:string;
  nazivAgencije:string;
  opisAgencije:string;
  adresaAgencije:string;
  promenaSlike:string;
  url:any;
  errorSlika:string;
  error:string;
  ngOnInit(): void {
    this.admin=null;
    this.admin=this.route.snapshot.paramMap.get('admin');
    if(this.admin=='admin'){
      let korIm=this.route.snapshot.paramMap.get('korisnik');
      this.adminKor=JSON.parse(sessionStorage.getItem('admin'))
      this.korisnikService.dohvatiKorisnika(korIm).subscribe((k:Korisnik)=>{
        this.korisnik=k;
        this.ime=this.korisnik.ime;
        this.prezime=this.korisnik.prezime;
        this.telefon=this.korisnik.telefon;
        this.mejl=this.korisnik.mejl;
        this.nazivAgencije=this.korisnik.nazivAgencije;
        this.opisAgencije=this.korisnik.opisAgencije;
        this.adresaAgencije=this.korisnik.adresaAgencije
        this.promenaSlike='ostavi';
        this.errorSlika=null;
      })
    }else{
      this.korisnik=JSON.parse(sessionStorage.getItem('korisnik'));
      this.ime=this.korisnik.ime;
      this.prezime=this.korisnik.prezime;
      this.telefon=this.korisnik.telefon;
      this.mejl=this.korisnik.mejl;
      this.nazivAgencije=this.korisnik.nazivAgencije;
      this.opisAgencije=this.korisnik.opisAgencije;
      this.adresaAgencije=this.korisnik.adresaAgencije
      this.promenaSlike='ostavi';
      this.errorSlika=null;
    }
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
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
  azurirajPodatkeKlijent(){
    //ako je izabrao promeni sliku a url==null onda zanci da je los format slike dao-->ostavi sliku
    let sablonTelefon=new RegExp(/^\d+$/);
    let sablonMejl=new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    if(!sablonMejl.test(this.mejl)){
      this.error="Mejl nije u dobrom formatu!";
      this.ngOnInit();
      return;
    }
    if(!sablonTelefon.test(this.telefon)){
      this.error="Kontakt telefon sme sadrzati samo cifre!";
      this.ngOnInit();
      return;
    }
    if(this.ime==""||this.prezime==""||this.telefon==""||this.mejl==""){
      this.error="Svi podaci moraju biti uneti!";
      this.ngOnInit();
      return;
    }
    if(this.errorSlika!=null&&this.errorSlika!=""){
      this.ngOnInit();
      return;
    }
    //nakon svake promene moram dovuci korisnika u session storage->sa azuriranim podacima
      if(this.promenaSlike=="obrisi"){
        this.url=null;
        this.klijnetService.azurirajPodatkeISliku(this.korisnik.korisnickoIme,this.url,this.ime,this.prezime,this.mejl,this.telefon).subscribe((resp)=>{
          this.korisnikService.dohvatiKorisnika(this.korisnik.korisnickoIme).subscribe((usr:Korisnik)=>{
            sessionStorage.removeItem('korisnik');
            sessionStorage.setItem('korisnik',JSON.stringify(usr));
            alert("Podaci su uspesno azurirani");
            this.nazadNaProfil();
          })
        })
      }else if(this.promenaSlike=='promeni'&&this.url!=null&&this.url!=""){
        this.klijnetService.azurirajPodatkeISliku(this.korisnik.korisnickoIme,this.url,this.ime,this.prezime,this.mejl,this.telefon).subscribe((resp)=>{
          this.korisnikService.dohvatiKorisnika(this.korisnik.korisnickoIme).subscribe((usr:Korisnik)=>{
            sessionStorage.removeItem('korisnik');
            sessionStorage.setItem('korisnik',JSON.stringify(usr));
            alert("Podaci su uspesno azurirani");
            this.nazadNaProfil();
          })
        })
      }else if(this.promenaSlike=='promeni'&&(this.url==null||this.url=="")){
        //korisnik je pokusao dodavanje slike, slika je bila u losem formatu ali je potvrdio podatke-->slika se ne menja
        this.klijnetService.azurirajPodatke(this.korisnik.korisnickoIme,this.ime,this.prezime,this.mejl,this.telefon).subscribe((resp)=>{
          this.korisnikService.dohvatiKorisnika(this.korisnik.korisnickoIme).subscribe((usr:Korisnik)=>{
            sessionStorage.removeItem('korisnik');
            sessionStorage.setItem('korisnik',JSON.stringify(usr));
            alert("Podaci su uspesno azurirani");
            this.nazadNaProfil();
          })
        })
      }else{
        //korisnik zeli da ostavi sliku
        this.klijnetService.azurirajPodatke(this.korisnik.korisnickoIme,this.ime,this.prezime,this.mejl,this.telefon).subscribe((resp)=>{
          this.korisnikService.dohvatiKorisnika(this.korisnik.korisnickoIme).subscribe((usr:Korisnik)=>{
            sessionStorage.removeItem('korisnik');
            sessionStorage.setItem('korisnik',JSON.stringify(usr));
            alert("Podaci su uspesno azurirani");
            this.nazadNaProfil();
          })
        })
      }
  }
  azurirajPodatkeAgencija(){
     //ako je izabrao promeni sliku a url==null onda zanci da je los format slike dao-->ostavi sliku
     let sablonTelefon=new RegExp(/^\d+$/);
     let sablonMejl=new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
      if(!sablonMejl.test(this.mejl)){
      this.error="Mejl nije u dobrom formatu!";
      this.ngOnInit();
      return;
      }
     if(!sablonTelefon.test(this.telefon)){
       this.error="Kontakt telefon sme sadrzati samo cifre!";
       this.ngOnInit();
       return;
     }
     if(this.nazivAgencije==""||this.adresaAgencije==""||this.telefon==""||this.mejl==""||this.opisAgencije==""){
       this.error="Svi podaci moraju biti uneti!";
       this.ngOnInit();
       return;
     }
     if(this.errorSlika!=null&&this.errorSlika!=""){
       this.ngOnInit();
       return;
     }
     //nakon svake promene moram dovuci korisnika u session storage->sa azuriranim podacima
       if(this.promenaSlike=="obrisi"){
         this.url=null;
         this.agencijaService.azurirajPodatkeISliku(this.korisnik.korisnickoIme,this.url,this.adresaAgencije,this.opisAgencije,this.nazivAgencije,this.mejl,this.telefon).subscribe((resp)=>{
           this.korisnikService.dohvatiKorisnika(this.korisnik.korisnickoIme).subscribe((usr:Korisnik)=>{
            sessionStorage.removeItem('korisnik');
             sessionStorage.setItem('korisnik',JSON.stringify(usr));
             alert("Podaci su uspesno azurirani");
             this.nazadNaProfil();
           })
         })
       }else if(this.promenaSlike=='promeni'&&this.url!=null&&this.url!=""){
         this.agencijaService.azurirajPodatkeISliku(this.korisnik.korisnickoIme,this.url,this.adresaAgencije,this.opisAgencije,this.nazivAgencije,this.mejl,this.telefon).subscribe((resp)=>{
           this.korisnikService.dohvatiKorisnika(this.korisnik.korisnickoIme).subscribe((usr:Korisnik)=>{
            sessionStorage.removeItem('korisnik');
             sessionStorage.setItem('korisnik',JSON.stringify(usr));
             alert("Podaci su uspesno azurirani");
             this.nazadNaProfil();
           })
         })
       }else if(this.promenaSlike=='promeni'&&(this.url==null||this.url=="")){
         //korisnik je pokusao dodavanje slike, slika je bila u losem formatu ali je potvrdio podatke-->slika se ne menja
         this.agencijaService.azurirajPodatke(this.korisnik.korisnickoIme,this.adresaAgencije,this.opisAgencije,this.nazivAgencije,this.mejl,this.telefon).subscribe((resp)=>{
           this.korisnikService.dohvatiKorisnika(this.korisnik.korisnickoIme).subscribe((usr:Korisnik)=>{
            sessionStorage.removeItem('korisnik');
             sessionStorage.setItem('korisnik',JSON.stringify(usr));
             alert("Podaci su uspesno azurirani");
             this.nazadNaProfil();
           })
         })
       }else{
         //korisnik zeli da ostavi sliku
         this.agencijaService.azurirajPodatke(this.korisnik.korisnickoIme,this.adresaAgencije,this.opisAgencije,this.nazivAgencije,this.mejl,this.telefon).subscribe((resp)=>{
           this.korisnikService.dohvatiKorisnika(this.korisnik.korisnickoIme).subscribe((usr:Korisnik)=>{
            sessionStorage.removeItem('korisnik');
             sessionStorage.setItem('korisnik',JSON.stringify(usr));
             alert("Podaci su uspesno azurirani");
             this.nazadNaProfil();
           })
         })
       }
  }
  nazadNaProfil(){
    if(this.admin=='admin'){
      this.router.navigate(["admin"]);
      return;
    }else{
      this.router.navigate(["profil"]);
    }
  }


}
