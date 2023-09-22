import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-klijent',
  templateUrl: './klijent.component.html',
  styleUrls: ['./klijent.component.css']
})
export class KlijentComponent implements OnInit {

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
  objekti(){
    this.router.navigate(['objekti']);
  }
  agencije(){
    this.router.navigate(['agencijeKlijent']);
  }
  poslovi(){
    this.router.navigate(['posloviKlijent']);
  }

}