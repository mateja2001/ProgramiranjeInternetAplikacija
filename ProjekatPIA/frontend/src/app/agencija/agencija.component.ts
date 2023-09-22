import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-agencija',
  templateUrl: './agencija.component.html',
  styleUrls: ['./agencija.component.css']
})
export class AgencijaComponent implements OnInit {

  constructor(private router:Router) { }

  trenutniKorisnik:Korisnik;
  ngOnInit(): void {
    this.trenutniKorisnik=JSON.parse(sessionStorage.getItem('korisnik'));
  }

  
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  promenaLozinke(){
    this.router.navigate(['promenaLozinke',{korisnickoIme:this.trenutniKorisnik.korisnickoIme, lozinka:this.trenutniKorisnik.lozinka}]);
  }

  profil(){
    this.router.navigate(['profil']);
  }
  poslovi(){
    this.router.navigate(['posloviAgencija']);
  }
  radnici(){
    this.router.navigate(['radniciAgencija']);
  }
}
