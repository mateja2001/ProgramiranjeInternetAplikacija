import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Korisnik } from '../models/korisnik';
import Komentar from '../models/komentar';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-detalji-agencija',
  templateUrl: './detalji-agencija.component.html',
  styleUrls: ['./detalji-agencija.component.css']
})
export class DetaljiAgencijaComponent implements OnInit {

  constructor(private route:ActivatedRoute, private korisnikService:KorisnikService, private router:Router) { }

  agencija:Korisnik=new Korisnik();
  tipKorisnika:string; //potrebno da znamo da li da prikazujemo pers. il nepers. podatke
  komentari:Komentar[]=[];
  ngOnInit(): void {
    let korIme=this.route.snapshot.paramMap.get('agencija');
    this.tipKorisnika=this.route.snapshot.paramMap.get('tip');
    this.korisnikService.dohvatiKorisnika(korIme).subscribe((agen:Korisnik)=>{
      this.agencija=agen;
      this.korisnikService.dohvatiKomentare(this.agencija.korisnickoIme).subscribe((kom:Komentar[])=>{
        this.komentari=kom;
      })
    })
    
  }
  nazadDoAgenicija(){
    this.router.navigate(['agencijeKlijent']);
  }
  nazadNaPocetnu(){
    this.router.navigate(['']);
  }
}
