import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Objekat } from '../models/objekat';
import { KlijentService } from '../klijent.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-prikazi-skicu',
  templateUrl: './prikazi-skicu.component.html',
  styleUrls: ['./prikazi-skicu.component.css']
})
export class PrikaziSkicuComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute, private klijentService:KlijentService) { }

  @ViewChild('canvas', {static:true}) myCanvas!: ElementRef;

  otkazivanje:boolean;
  skica:String;
  objekat:Objekat;
  razlog:string;
  zavrsen:boolean;
  errorOtkazivanje:string;
  korisnik:Korisnik=new Korisnik();
  ngOnInit(): void {
    this.otkazivanje=false;
    this.razlog=null;
    this.errorOtkazivanje=null;
    this.korisnik=JSON.parse(sessionStorage.getItem('korisnik'));
    this.objekat=JSON.parse(this.route.snapshot.paramMap.get('objekat'));
    this.skica=this.route.snapshot.paramMap.get('skica');
    this.zavrsen=true;
    for(let p of this.objekat.prostorije){
      if(p.status!='zavrseno'){
        this.zavrsen=false;
        break;
      }
    }
    const canvas : HTMLCanvasElement=this.myCanvas.nativeElement;
    const context=canvas.getContext('2d');
    this.prikaziSkicu(context)
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  nazadNaObjekte(){
    this.router.navigate(["objekti"]);
  }
  nazadNaPoslove(){
    this.router.navigate(["posloviKlijent"]);
  }
  platiPosao(){
    //mozda bi bilo dobro da se posalje i ID posla pa preko toga, ali moze i ovako preko idOBj + uslov da je posao aktivan->(ne moze isti obj 2 puta da se radi)
    this.klijentService.platiPosao(this.objekat._id).subscribe((resp)=>{
      if(resp['message']=='ok'){
        alert('Uspesno ste platili posao!')
        this.router.navigate(['posloviKlijent'])
      }
    })
  }
  prikaziSkicu(context:CanvasRenderingContext2D){
    if(this.skica=='skica'){
      for(let p of this.objekat.prostorije){
        context.strokeStyle='black';
        context.strokeRect(p.xKoord,p.yKoord,p.duzina,p.sirina);
        context.strokeStyle='black';
        context.fillStyle='brown';
        //uslovi za dobru orjentaciju iscrtavanja vrata
        if(p.xKoord==p.xVrata){
          context.fillRect(p.xVrata,p.yVrata-5,20,10);
          context.strokeRect(p.xVrata,p.yVrata-5,20,10);
        }else if(p.yKoord==p.yVrata){
          context.fillRect(p.xVrata-5,p.yVrata,10,20);
          context.strokeRect(p.xVrata-5,p.yVrata,10,20);
        }else if(p.yVrata==p.yKoord+p.sirina){
          context.fillRect(p.xVrata-5,p.yVrata-20,10,20);
          context.strokeRect(p.xVrata-5,p.yVrata-20,10,20);
        }else{
          //p.xVrata=p.xKoord+p.duzina
          context.fillRect(p.xVrata-20,p.yVrata-5,20,10);
          context.strokeRect(p.xVrata-20,p.yVrata-5,20,10);
        }
      }
    }else{
      for(let p of this.objekat.prostorije){
        if(p.status=='ne radi se'){
          context.strokeStyle='black';
          context.strokeRect(p.xKoord,p.yKoord,p.duzina,p.sirina);
        }
        if(p.status=='u toku'){
          context.strokeStyle='black';
          context.fillStyle='red';
          context.fillRect(p.xKoord,p.yKoord,p.duzina,p.sirina);
          context.strokeRect(p.xKoord,p.yKoord,p.duzina,p.sirina);
        }
        if(p.status=='zavrseno'){
          context.strokeStyle='black';
          context.fillStyle='green';
          context.fillRect(p.xKoord,p.yKoord,p.duzina,p.sirina);
          context.strokeRect(p.xKoord,p.yKoord,p.duzina,p.sirina);
        }
        context.strokeStyle='black';
        context.fillStyle='brown';
        
        //uslovi za dobru orjentaciju iscrtavanja vrata
        if(p.xKoord==p.xVrata){
          context.fillRect(p.xVrata,p.yVrata-5,20,10);
          context.strokeRect(p.xVrata,p.yVrata-5,20,10);
        }else if(p.yKoord==p.yVrata){
          context.fillRect(p.xVrata-5,p.yVrata,10,20);
          context.strokeRect(p.xVrata-5,p.yVrata,10,20);
        }else if(p.yVrata==p.yKoord+p.sirina){
          context.fillRect(p.xVrata-5,p.yVrata-20,10,20);
          context.strokeRect(p.xVrata-5,p.yVrata-20,10,20);
        }else{
          //p.xVrata=p.xKoord+p.duzina
          context.fillRect(p.xVrata-20,p.yVrata-5,20,10);
          context.strokeRect(p.xVrata-20,p.yVrata-5,20,10);
        }
      }
    }
    
  }
  otkazi(){
    this.otkazivanje=!this.otkazivanje;
  }
  zahtevZaOtkazivanje(){
    if(this.razlog==null||this.razlog==""){
      this.errorOtkazivanje="Morate navesti razlog otkazivanja!";
      return;
    }
    this.errorOtkazivanje=null;
    let idPosla=this.route.snapshot.paramMap.get('idPosla');
    this.klijentService.zahtevZaOtkazivanje(idPosla,this.razlog).subscribe((resp)=>{
      if(resp['message']=='ok'){
        alert("Uspesno ste otkazali posao!");
        this.router.navigate(['posloviKlijent']);
      }
    })
  }
}
