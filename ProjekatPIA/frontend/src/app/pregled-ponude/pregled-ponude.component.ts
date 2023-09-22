import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Objekat } from '../models/objekat';
import { Posao } from '../models/posao';
import { KlijentService } from '../klijent.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-pregled-ponude',
  templateUrl: './pregled-ponude.component.html',
  styleUrls: ['./pregled-ponude.component.css']
})
export class PregledPonudeComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute, private klijentService:KlijentService) { }
  
  objekat:Objekat;
  posao:Posao;
  nazivAgencije:string;
  korisnik:Korisnik=new Korisnik();
  ngOnInit(): void {
    this.korisnik=JSON.parse(sessionStorage.getItem('korisnik'));
    this.objekat=JSON.parse(this.route.snapshot.paramMap.get('objekat'));
    this.posao=JSON.parse(this.route.snapshot.paramMap.get('posao'));
    this.nazivAgencije=this.route.snapshot.paramMap.get('agencija');
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  nazadPoslovi(){
    this.router.navigate(['posloviKlijent']);
  }
  prihvati(){
    this.klijentService.prihvatiPonudu(this.posao._id).subscribe((resp)=>{
      if(resp['message']=='ok'){
        alert("Uspesno ste prihvatili ponudu!");
        this.router.navigate(['posloviKlijent']);
      }
    })
  }
  odbij(){
    this.klijentService.odbijPonudu(this.posao._id,this.objekat._id).subscribe((resp)=>{
      if(resp['message']=='ok'){
        alert("Uspesno ste odbili ponudu!");
        this.router.navigate(['posloviKlijent'])
      }
    })
  }
}
