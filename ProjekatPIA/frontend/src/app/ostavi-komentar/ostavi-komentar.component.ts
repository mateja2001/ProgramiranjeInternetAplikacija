import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Posao } from '../models/posao';
import { ActivatedRoute, Router } from '@angular/router';
import { KlijentService } from '../klijent.service';
import Komentar from '../models/komentar';

@Component({
  selector: 'app-ostavi-komentar',
  templateUrl: './ostavi-komentar.component.html',
  styleUrls: ['./ostavi-komentar.component.css']
})
export class OstaviKomentarComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router, private klijentService:KlijentService) { }

  korisnik:Korisnik=new Korisnik();
  posao:Posao;
  komentar:Komentar=new Komentar();
  textKom:string;
  ocena:number;
  error:string;
  promena:boolean;
  ngOnInit(): void {
    this.promena=false;
    this.error=null;
    this.ocena=null;
    this.textKom=null;
    this.korisnik=JSON.parse(sessionStorage.getItem('korisnik'));
    this.posao=JSON.parse(this.route.snapshot.paramMap.get('posao'));
    this.klijentService.dohvatiKomentar(this.posao._id).subscribe((kom:Komentar)=>{
      this.komentar=kom
      if(this.komentar!=null){
        this.ocena=this.komentar.ocena;
        this.textKom=this.komentar.komentar;
      }
    })
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  nazadPoslovi(){
    this.router.navigate(['posloviKlijent']);
  }
  dodajKomentar(){
    if(this.ocena==null || this.textKom==null||this.textKom==""){
      this.error="Morate uneti sva polja!";
      return;
    }
    if(this.ocena>5||this.ocena<1){
      this.error='Ocena mora biti u opsegu od 1 do 5!';
      return;
    }
    this.klijentService.ostaviKomentar(this.posao._id,this.ocena,this.textKom,this.korisnik.korisnickoIme,this.posao.agencija).subscribe((resp)=>{
      if(resp['message']=='ok'){
        alert("Uspesno ste dodali komentar!");
        this.ngOnInit();
      }
    })
  }
  izmeni(){
    this.promena=!this.promena;
    this.ocena=this.komentar.ocena;
    this.textKom=this.komentar.komentar;
  }
  promeniKomentar(){
    if(this.ocena==null || this.textKom==null||this.textKom==""){
      this.error="Morate uneti sva polja!";
      return;
    }
    if(this.ocena>5||this.ocena<1){
      this.error='Ocena mora biti u opsegu od 1 do 5!';
      return;
    }
    this.klijentService.izmeniKomentar(this.posao._id,this.ocena,this.textKom).subscribe((resp)=>{
      if(resp['message']=='ok'){
        alert("Uspesno ste izmenili komentar!");
        this.ngOnInit();
      }
    })
  }
  obrisiKomentar(){
    this.klijentService.obrisiKomentar(this.posao._id).subscribe((resp)=>{
      if(resp['message']=='ok'){
        alert("Uspesno ste obrisali komentar!");
        this.ngOnInit();
      }
    })
  }
}
