import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Posao } from '../models/posao';
import { AgencijaService } from '../agencija.service';
import { Objekat } from '../models/objekat';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-prihvati-zahtev',
  templateUrl: './prihvati-zahtev.component.html',
  styleUrls: ['./prihvati-zahtev.component.css']
})
export class PrihvatiZahtevComponent implements OnInit {

  constructor(private route:ActivatedRoute, private agencijaService:AgencijaService, private router:Router) { }

  zahtev:Posao;
  objekat:Objekat=new Objekat();
  korisnik:Korisnik=new Korisnik();
  agencija:Korisnik=new Korisnik();
  nadoknada:number;
  error:string;
  ngOnInit(): void {
    this.agencija=JSON.parse(sessionStorage.getItem('korisnik'));
    this.zahtev=JSON.parse(this.route.snapshot.paramMap.get('zahtev'));
    this.nadoknada=null;
    this.agencijaService.dohvatiKorisnika(this.zahtev.korisnik).subscribe((kor:Korisnik)=>{
      this.korisnik=kor;
      this.agencijaService.dohvatiObejkat(this.zahtev.objekat).subscribe((obj:Objekat)=>{
        this.objekat=obj;
      })
    })
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  nazadPoslovi(){
    this.router.navigate(['posloviAgencija'])
  }
  odbijZahtev(){
    this.agencijaService.odbijZahtev(this.zahtev._id,this.zahtev.objekat).subscribe((resp)=>{
      if(resp['message']=='ok'){
        alert("Zahtev uspesno odbijen!");
        this.router.navigate(['posloviAgencija']);
      }
    })
  }
  prihvatiZahtev(){
    if(this.nadoknada==null||this.nadoknada==0){
      this.error="Morate uneti nadoknadu!";
      return;
    }
    this.agencijaService.prihvatiZahtev(this.zahtev._id,this.nadoknada).subscribe((resp)=>{
      if(resp['message']=='ok'){
        alert("Ponuda uspesno poslata!");
        this.router.navigate(['posloviAgencija']);
      }
    })
  }


}
