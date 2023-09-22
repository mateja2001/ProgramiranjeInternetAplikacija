import { Component, OnInit } from '@angular/core';
import { Radnik } from '../models/radnik';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Korisnik } from '../models/korisnik';
import { AgencijaService } from '../agencija.service';

@Component({
  selector: 'app-azuriraj-radnika',
  templateUrl: './azuriraj-radnika.component.html',
  styleUrls: ['./azuriraj-radnika.component.css']
})
export class AzurirajRadnikaComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute,private adminService:AdminService, private agencijaService:AgencijaService) { }
  radnik:Radnik=new Radnik()
  admin:Korisnik=new Korisnik();
  agencija:Korisnik=new Korisnik();
  ime:string;
  prezime:string;
  telefon:string;
  mejl:string;
  strucnost:string;
  error:string;
  ngOnInit(): void {
    this.admin=JSON.parse(sessionStorage.getItem('admin'));
    this.agencija=JSON.parse(sessionStorage.getItem('korisnik'));
    this.radnik=JSON.parse(this.route.snapshot.paramMap.get('radnik'))
    this.ime=this.radnik.ime;
    this.prezime=this.radnik.prezime;
    this.telefon=this.radnik.telefon;
    this.mejl=this.radnik.mejl;
    this.strucnost=this.radnik.strucnost;
  }

  azuriraj(){
    if(this.admin!=null){
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
      radnik._id=this.radnik._id
      radnik.ime=this.ime;
      radnik.prezime=this.prezime;
      radnik.mejl=this.mejl;
      radnik.telefon=this.telefon;
      radnik.strucnost=this.strucnost;
      radnik.agencija=this.radnik.agencija;
      this.adminService.azurirajRadnika(radnik).subscribe((resp)=>{
        if(resp['message']=='ok'){
          this.router.navigate(['zaposleniAgencija',{'agencija':radnik.agencija}]);
        }
      })
    }
    else{
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
      radnik._id=this.radnik._id
      radnik.ime=this.ime;
      radnik.prezime=this.prezime;
      radnik.mejl=this.mejl;
      radnik.telefon=this.telefon;
      radnik.strucnost=this.strucnost;
      radnik.agencija=this.radnik.agencija;
      this.agencijaService.azurirajRadnika(radnik).subscribe((resp)=>{
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
    this.router.navigate(['zaposleniAgencija',{agencija:this.radnik.agencija}]);
  }
  nazadNaRadnike(){
    this.router.navigate(['radniciAgencija']);
  }
}
