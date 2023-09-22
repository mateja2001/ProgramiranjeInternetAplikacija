import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Posao } from '../models/posao';
import { ActivatedRoute, Router } from '@angular/router';
import { Objekat } from '../models/objekat';
import { AgencijaService } from '../agencija.service';
import { Zaposleni } from '../models/zaposleni';
import { Korisnik } from '../models/korisnik';
import { Radnik } from '../models/radnik';

@Component({
  selector: 'app-posao-napredak',
  templateUrl: './posao-napredak.component.html',
  styleUrls: ['./posao-napredak.component.css']
})
export class PosaoNapredakComponent implements OnInit {

  @ViewChild('canvas', {static:true}) myCanvas!: ElementRef;

  constructor(private route:ActivatedRoute, private agencijaService:AgencijaService, private router:Router) { }

  zavrsen:boolean;
  //prostorijaX-> za slucaj da treba status da se menja i putem forme
  prostorija1:string;
  prostorija2:string;
  prostorija3:string;
  agencija:Korisnik=new Korisnik();
  error:string;
  idPosla:string
  posao:Posao=new Posao();
  objekat:Objekat=new Objekat();
  zaposleni:Zaposleni=new Zaposleni();
  canvas:HTMLCanvasElement
  context:CanvasRenderingContext2D
  slobodniRadnici:Radnik[]=[];
  ngOnInit(): void {
    this.idPosla=this.route.snapshot.paramMap.get('posao');
    this.agencija=JSON.parse(sessionStorage.getItem('korisnik'));
    this.canvas=this.myCanvas.nativeElement;
    this.zavrsen=true;
    this.canvas.addEventListener("mousedown", this.click, false);
    this.agencijaService.dohvatiPosao(this.idPosla).subscribe((po:Posao)=>{
      this.posao=po;
      this.agencijaService.dohvatiZaposlene(this.posao.agencija).subscribe((zap:Zaposleni)=>{
        this.zaposleni=zap;
        this.agencijaService.dohvatiObejkat(this.posao.objekat).subscribe((obj:Objekat)=>{
          this.objekat=obj;
          let i=0;
          for(let p of this.objekat.prostorije){
            i++;
            if(i==1){
              this.prostorija1=p.status;
            }
            if(i==2){
              this.prostorija2=p.status;
            }
            if(i==3){
              this.prostorija3=p.status;
            }
            if(p.status!='zavrseno'){
              this.zavrsen=false;
            }
          }
          if(this.zaposleni==null){
            this.nemaDovoljnoRadnika(this.objekat);
          }
          else if(this.posao.brojRadnika==null && this.zavrsen==false && this.zaposleni.brojRadnika<this.objekat.brojProstorija){
            this.nemaDovoljnoRadnika(this.objekat);
          }else{
            this.agencijaService.dohvatiSlobodneRadnikeAgencije(this.posao.agencija).subscribe((rad:Radnik[])=>{
              this.slobodniRadnici=rad;
              this.nacrtajSkicu(this.objekat);
            })
          }
        })
      })
    })
    
  }
  
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  click = (event: MouseEvent): void => {
    let rect = this.canvas.getBoundingClientRect();
    let x = (event.clientX - rect.left)/rect.width*this.canvas.width;
    let y = (event.clientY - rect.top)/rect.height*this.canvas.height;
    let promena=false;
    if(this.posao.brojRadnika!=null){
      for(let p of this.objekat.prostorije){
        if(p.xKoord<=x&&p.xKoord+p.duzina>=x&&p.yKoord<=y&&p.yKoord+p.sirina>=y){
          promena=true;
          if(p.status=='ne radi se'){
            p.status='u toku'
            break;
          }
          if(p.status=='u toku'){
            p.status='zavrseno';
            break;
          }
          if(p.status=='zavrseno'){
            p.status='u toku';
            break;
          }
        }
      }
      if(promena==true){
        this.agencijaService.izmeniObjekat(this.objekat).subscribe((resp)=>{
          if(resp['message']=='ok'){
            alert('Uspesno ste promenili status prostorije!');
            //ukoliko je objekat zavrsen->osloboditi radnike
            this.zavrsen=true;
            for(let p of this.objekat.prostorije){
              if(p.status!='zavrseno'){
                this.zavrsen=false;
              }
            }
            this.ngOnInit();
          }
        })
      }
    }
    event.preventDefault();
  }
  nazadPoslovi(){
    this.router.navigate(['posloviAgencija']);
  }
  oslobodiRadnike(){
    this.agencijaService.oslobodiRadnike(this.posao._id,this.posao.agencija,this.posao.brojRadnika, this.posao.objekat).subscribe((resp)=>{
      if(resp['message']=='ok'){
        this.ngOnInit();
      }
    })
  }
  nemaDovoljnoRadnika(objekat:Objekat){
    this.canvas=this.myCanvas.nativeElement;
    this.context=this.canvas.getContext('2d');
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(let p of objekat.prostorije){
      this.context.strokeStyle='black';
      this.context.fillStyle='yellow';
      this.context.fillRect(p.xKoord,p.yKoord,p.duzina,p.sirina);
      this.context.strokeRect(p.xKoord,p.yKoord,p.duzina,p.sirina);
      this.context.strokeStyle='black';
      this.context.fillStyle='brown';
      //uslovi za dobru orjentaciju iscrtavanja vrata
      if(p.xKoord==p.xVrata){
        this.context.fillRect(p.xVrata,p.yVrata-5,20,10);
        this.context.strokeRect(p.xVrata,p.yVrata-5,20,10);
      }else if(p.yKoord==p.yVrata){
        this.context.fillRect(p.xVrata-5,p.yVrata,10,20);
        this.context.strokeRect(p.xVrata-5,p.yVrata,10,20);
      }else if(p.yVrata==p.yKoord+p.sirina){
        this.context.fillRect(p.xVrata-5,p.yVrata-20,10,20);
        this.context.strokeRect(p.xVrata-5,p.yVrata-20,10,20);
      }else{
        //p.xVrata=p.xKoord+p.duzina
        this.context.fillRect(p.xVrata-20,p.yVrata-5,20,10);
        this.context.strokeRect(p.xVrata-20,p.yVrata-5,20,10);
      }
    }
  }

  nacrtajSkicu(objekat:Objekat){
    this.canvas=this.myCanvas.nativeElement;
    this.context=this.canvas.getContext('2d');
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(let p of objekat.prostorije){
      if(p.status=='ne radi se'){
        this.context.strokeStyle='black';
        this.context.strokeRect(p.xKoord,p.yKoord,p.duzina,p.sirina);
      }
      if(p.status=='u toku'){
        this.context.strokeStyle='black';
        this.context.fillStyle='red';
        this.context.fillRect(p.xKoord,p.yKoord,p.duzina,p.sirina);
        this.context.strokeRect(p.xKoord,p.yKoord,p.duzina,p.sirina);
      }
      if(p.status=='zavrseno'){
        this.context.strokeStyle='black';
        this.context.fillStyle='green';
        this.context.fillRect(p.xKoord,p.yKoord,p.duzina,p.sirina);
        this.context.strokeRect(p.xKoord,p.yKoord,p.duzina,p.sirina);
      }
      this.context.strokeStyle='black';
      this.context.fillStyle='brown';
      //uslovi za dobru orjentaciju iscrtavanja vrata
      if(p.xKoord==p.xVrata){
        this.context.fillRect(p.xVrata,p.yVrata-5,20,10);
        this.context.strokeRect(p.xVrata,p.yVrata-5,20,10);
      }else if(p.yKoord==p.yVrata){
        this.context.fillRect(p.xVrata-5,p.yVrata,10,20);
        this.context.strokeRect(p.xVrata-5,p.yVrata,10,20);
      }else if(p.yVrata==p.yKoord+p.sirina){
        this.context.fillRect(p.xVrata-5,p.yVrata-20,10,20);
        this.context.strokeRect(p.xVrata-5,p.yVrata-20,10,20);
      }else{
        //p.xVrata=p.xKoord+p.duzina
        this.context.fillRect(p.xVrata-20,p.yVrata-5,20,10);
        this.context.strokeRect(p.xVrata-20,p.yVrata-5,20,10);
      }
    }
    
  }
  dodeliRadnike(){
    let radnici=0;
    for(let r of this.slobodniRadnici){
      if(r.izabran==true){
        radnici++;
      }
    }
    if(radnici<this.objekat.brojProstorija){
      this.error='Svaka prostorija treba da ima minimum jednog radnika';
      return;
    }
    for(let r of this.slobodniRadnici){
      if(r.izabran==true){
        this.agencijaService.uposliRadnika(r._id,this.posao.objekat).subscribe((resp)=>{
        })
      }
    }
    this.agencijaService.dodeliRadnike(this.posao._id,radnici,this.posao.agencija,this.zaposleni.brojRadnika-radnici).subscribe((resp)=>{
      this.ngOnInit();
    }) 
  }

}
