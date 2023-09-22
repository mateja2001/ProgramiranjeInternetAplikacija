import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private router:Router) { }

  korisnik:Korisnik
  ngOnInit(): void {
    this.korisnik=JSON.parse(sessionStorage.getItem('korisnik'));
  }
  nazadDoMenija(){
    if(this.korisnik.tip=='klijent'){
      this.router.navigate(['klijent']);
    }else{
      this.router.navigate(['agencija']);
    }
  }
  azurirajProfil(){
    this.router.navigate(['azuriranjeProfila']);
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
