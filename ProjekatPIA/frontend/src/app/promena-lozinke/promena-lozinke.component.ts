import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private route :ActivatedRoute, private korisnikService:KorisnikService, private router:Router) { }

  korisnickoIme:string;
  staraLozinka:string;
  staraLozinkaUnos:string
  novaLozinka:string;
  potvrdaNoveLozinke:string;
  error:string;
  potvrda:string;
  trenutniKorisnik:Korisnik
  ngOnInit(): void {
    this.trenutniKorisnik=JSON.parse(sessionStorage.getItem('korisnik'));
    if(this.trenutniKorisnik==null){
      this.trenutniKorisnik=JSON.parse(sessionStorage.getItem('admin'));
    }
    this.novaLozinka=null;
    this.potvrdaNoveLozinke=null;
    this.staraLozinkaUnos=null;
    this.potvrda=null;
    this.korisnickoIme=this.route.snapshot.paramMap.get('korisnickoIme');
    this.staraLozinka=this.route.snapshot.paramMap.get('lozinka');
  }

  promeniLozinku(){
    let sablonLozinka=new RegExp(/^(?=.*[A-Z])(?=.*[!@#$%^&*()-=_+|;':",.<>/?])(?=.*[0-9])[A-Za-z][A-Za-z0-9!@#$%^&*()-=_+|;':",.<>/?]{6,11}$/);
    if(this.novaLozinka==null||this.staraLozinkaUnos==null||this.potvrdaNoveLozinke==null){
      this.error="Morate uneti sva polja!";
      this.novaLozinka=null;
      this.potvrdaNoveLozinke=null;
      this.staraLozinkaUnos=null;
      return;
    }
    if(this.staraLozinka!=this.staraLozinkaUnos){
      this.error="Niste tacno uneli staru lozinku!";
      this.novaLozinka=null;
      this.potvrdaNoveLozinke=null;
      this.staraLozinkaUnos=null;
      return;
    }
    if(this.novaLozinka==this.staraLozinka){
      this.error="Uneta nova lozinka je ista kao i stara!";
      return;
    }
    if(this.novaLozinka!=this.potvrdaNoveLozinke){
      this.error="Unete nove lozinke nisu iste!";
      this.novaLozinka=null;
      this.potvrdaNoveLozinke=null;
      this.staraLozinkaUnos=null;
      return;
    }
    if(!sablonLozinka.test(this.novaLozinka)){
      this.error="Lozinka mora sadrzati bar jedno veliko slovo, jedan specijalni karakter i jedan broj, i mora pocinjati slovom. Duzina mora biti izmedju 7 i 12 karaktera.";
      this.novaLozinka=null;
      this.potvrdaNoveLozinke=null;
      this.staraLozinkaUnos=null;
      return;
    }
    this.korisnikService.promeniLozinku(this.korisnickoIme,this.novaLozinka).subscribe((resp)=>{
      if(resp['message']=='ok'){
        alert('Lozinka je uspesno promenjena!');
        sessionStorage.clear();
        this.router.navigate([""]);
      }
    })

  }
  nazadDoMenija(){
    if(this.trenutniKorisnik.tip=='klijent'){
      this.router.navigate(["klijent"]);
    }else if(this.trenutniKorisnik.tip=='agencija'){
      this.router.navigate(["agencija"]);
    }else{
      this.router.navigate(["admin"]);
    }
    
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
