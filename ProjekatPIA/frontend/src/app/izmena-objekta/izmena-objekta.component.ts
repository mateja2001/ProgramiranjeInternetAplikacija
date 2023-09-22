import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Objekat } from '../models/objekat';
import { ActivatedRoute, Router } from '@angular/router';
import { Prostorija } from '../models/prostorija';
import { KlijentService } from '../klijent.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-izmena-objekta',
  templateUrl: './izmena-objekta.component.html',
  styleUrls: ['./izmena-objekta.component.css']
})
export class IzmenaObjektaComponent implements OnInit {
  
  @ViewChild('canvas', {static:true}) myCanvas!: ElementRef;

  constructor(private route:ActivatedRoute, private router:Router, private klijentService:KlijentService) { }
  canvas:HTMLCanvasElement
  context:CanvasRenderingContext2D
  objekat:Objekat;
  objProstorija1:Objekat;
  objProstorija2:Objekat;
  objProstorija3:Objekat;
  tip:string;
  adresa:string;
  kvadratura:number;
  brojProstorija:number;
  ucitanObjekat:Objekat;
  errorObjekat:string;
  dodavanje:string;
  korisnik:Korisnik=new Korisnik();
  ngOnInit(): void {
    this.objekat=JSON.parse(this.route.snapshot.paramMap.get('objekat'));
    this.korisnik=JSON.parse(sessionStorage.getItem('korisnik'));
    this.adresa=this.objekat.adresa;
    this.kvadratura=this.objekat.kvadratura;
    this.brojProstorija=this.objekat.brojProstorija;
    this.tip=this.objekat.tip;
    this.dodavanje='rucno';
    this.inicijalizujObjekteZaSkicu();
    if(this.brojProstorija==1){
      this.objProstorija1=this.objekat;
    }else if(this.brojProstorija==2){
      this.objProstorija2=this.objekat;
    }else{
      this.objProstorija3=this.objekat;
    }
    this.prikaziPredefinisanuSkicu();
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
    //objekti koji omogucju prikaz predefinisane skice
  //objekti koji omogucju prikaz predefinisane skice
  inicijalizujObjekteZaSkicu(){
    this.objProstorija1=new Objekat();
    this.objProstorija1.prostorije=[];
    this.objProstorija2=new Objekat();
    this.objProstorija2.prostorije=[];
    this.objProstorija3=new Objekat();
    this.objProstorija3.prostorije=[];
    let prostorija1=new Prostorija()
    prostorija1.xKoord=50;
    prostorija1.yKoord=50;
    prostorija1.duzina=200
    prostorija1.sirina=100;
    prostorija1.xVrata=150;
    prostorija1.yVrata=150;
    prostorija1.status='ne radi se';
    this.objProstorija1.prostorije.push(prostorija1);
    let prostorija2=new Prostorija();
    prostorija2.xKoord=250;
    prostorija2.yKoord=50;
    prostorija2.duzina=100;
    prostorija2.sirina=100;
    prostorija2.xVrata=250;
    prostorija2.yVrata=100;
    prostorija2.status='ne radi se';
    this.objProstorija2.prostorije.push(prostorija1);
    this.objProstorija2.prostorije.push(prostorija2);
    let prostorija22=new Prostorija();
    prostorija22.xKoord=250;
    prostorija22.yKoord=50;
    prostorija22.duzina=100;
    prostorija22.sirina=100;
    prostorija22.xVrata=300;
    prostorija22.yVrata=150;
    prostorija22.status='ne radi se';
    let prostorija3=new Prostorija();
    prostorija3.xKoord=100;
    prostorija3.yKoord=150;
    prostorija3.duzina=250;
    prostorija3.sirina=100;
    prostorija3.xVrata=200;
    prostorija3.yVrata=250;
    prostorija3.status='ne radi se';
    this.objProstorija3.prostorije.push(prostorija1);
    this.objProstorija3.prostorije.push(prostorija22);
    this.objProstorija3.prostorije.push(prostorija3);
  }

    prikaziPredefinisanuSkicu(){
      if(this.brojProstorija>0&&this.brojProstorija<4){
        if(this.brojProstorija==1){
          this.nacrtajPredefinisanuSkicu(this.objProstorija1);
        }else if(this.brojProstorija==2){
          this.nacrtajPredefinisanuSkicu(this.objProstorija2);
        }else{
          this.nacrtajPredefinisanuSkicu(this.objProstorija3);
        }
      }else{
        //ukoliko je unet pogresan broj samo ocisti canvas
        this.canvas=this.myCanvas.nativeElement;
        this.context=this.canvas.getContext('2d');
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }

    nacrtajPredefinisanuSkicu(objekat:Objekat){
      this.canvas=this.myCanvas.nativeElement;
      this.context=this.canvas.getContext('2d');
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for(let p of objekat.prostorije){
        this.context.strokeStyle='black';
        this.context.strokeRect(p.xKoord,p.yKoord,p.duzina,p.sirina);
        this.context.strokeStyle='black';
        this.context.fillStyle='brown';
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
          //p.xVrata==p.xKoord+p.duzina
          this.context.fillRect(p.xVrata-20,p.yVrata-5,20,10);
          this.context.strokeRect(p.xVrata-20,p.yVrata-5,20,10);
        }
      }   
    }

    ocisti(){
      this.canvas=this.myCanvas.nativeElement;
      this.context=this.canvas.getContext('2d');
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    promenaProstorija(){
      this.inicijalizujObjekteZaSkicu();
      this.ucitanObjekat=null;
      this.prikaziPredefinisanuSkicu();
    }
    nazad(){
      this.router.navigate(["objekti"]);
    }
    izmeniObjekat(){
      
      if(this.tip==null||this.tip==""||this.adresa==null||this.adresa==""
      ||this.brojProstorija>3||this.brojProstorija<1||this.brojProstorija==null||
      this.kvadratura==0||this.kvadratura==null){
        this.errorObjekat="Morate uneti sve podatke! Broj prostorije sme da bude minimalno 1 maksimalno 3. Kvadratura ne sme biti 0!"
        return;
      }
      //dodaje se predefinisana skica prostorija
      let obj=new Objekat();
      obj._id=this.objekat._id
      obj.tip=this.tip;
      obj.adresa=this.adresa;
      obj.brojProstorija=this.brojProstorija;
      obj.kvadratura=this.kvadratura;
      obj.korisnik=this.objekat.korisnik
      obj.prostorije=[];
      if(this.brojProstorija==1){
        obj.prostorije=this.objProstorija1.prostorije;  
      }else if(this.brojProstorija==2){
        obj.prostorije=this.objProstorija2.prostorije;
      }else{
        obj.prostorije=this.objProstorija3.prostorije;
      }
      this.klijentService.izmeniObjekat(obj).subscribe((resp)=>{
        if(resp['message']=='ok'){
          alert("Uspesno ste izmenili objekat!");
          this.router.navigate(['objekti']);  
        }
      })
    }

    ucitajObjekat(event: any) { 
      if(event.target.files[0]!=null){
        var reader = new FileReader();
        reader.readAsText(event.target.files[0]);
        reader.onload = (_event) => {
          let s=JSON.parse(_event.target.result.toString())
          this.ucitanObjekat=s;
         //neblokirajuca metoda(onload) mora unutar nje da se odradi prikazivanje,
         //tada znamo da je objekast sigurno ucitan
         if(this.proveriIspravnostObjekta()){
            this.errorObjekat=null;
            if(this.ucitanObjekat.brojProstorija==1){
              this.brojProstorija=1;
              this.objProstorija1.prostorije=this.ucitanObjekat.prostorije;
            }else if(this.ucitanObjekat.brojProstorija==2){
              this.brojProstorija=2;
              this.objProstorija2.prostorije=this.ucitanObjekat.prostorije;
            }else{
              this.brojProstorija=3
              this.objProstorija3.prostorije=this.ucitanObjekat.prostorije;
            }
            this.prikaziPredefinisanuSkicu();
         }else{
          this.errorObjekat="Svaka prostorija mora da se dodiruje bar sa jednom. Vrata u svakoj prostoriji moraju biti na zidu. Prostorije se ne semeju preklapati!";
          this.ucitanObjekat=null;
          this.ocisti();
         } 
        }
      }
      else{
        this.ucitanObjekat=null;
        this.ocisti();
      }
    }
    proveriIspravnostObjekta(){
      if(this.ucitanObjekat==null){
        return false;
      }
      if(this.ucitanObjekat.brojProstorija==null||this.ucitanObjekat.brojProstorija<1||this.ucitanObjekat.brojProstorija>3
        ||this.ucitanObjekat.prostorije==null||this.ucitanObjekat.prostorije.length<1||
        this.ucitanObjekat.prostorije.length>3||this.ucitanObjekat.prostorije.length!=this.ucitanObjekat.brojProstorija){
        return false;
      }
      //provera svake prostorije
      if(this.ucitanObjekat.brojProstorija==1){
        //broj prostorija 1
        if(!this.proveriProstoriju(this.ucitanObjekat.prostorije[0])){
          return false;
        }
      }else if(this.ucitanObjekat.brojProstorija==2){
        //broj prostorija 2
        if(!this.proveriProstoriju(this.ucitanObjekat.prostorije[0])||!this.proveriProstoriju(this.ucitanObjekat.prostorije[1])){
          return false;
        }
        if(!this.proveriKontkatk(this.ucitanObjekat.prostorije[0].xKoord,this.ucitanObjekat.prostorije[0].yKoord,
          this.ucitanObjekat.prostorije[0].xKoord+this.ucitanObjekat.prostorije[0].duzina,
          this.ucitanObjekat.prostorije[0].yKoord+this.ucitanObjekat.prostorije[0].sirina,
          this.ucitanObjekat.prostorije[1].xKoord,this.ucitanObjekat.prostorije[1].yKoord,
          this.ucitanObjekat.prostorije[1].xKoord+this.ucitanObjekat.prostorije[1].duzina,
          this.ucitanObjekat.prostorije[1].yKoord+this.ucitanObjekat.prostorije[1].sirina)){
            return false;
          }
  
      }
      else{
        //broj prostorija 3
        if(!this.proveriProstoriju(this.ucitanObjekat.prostorije[0])||!this.proveriProstoriju(this.ucitanObjekat.prostorije[1])||!this.proveriProstoriju(this.ucitanObjekat.prostorije[2])){
          return false;
        }
        //svaka soba mora bar sa jednom da bude u kontaktu
        if(!this.proveriKontkatk(this.ucitanObjekat.prostorije[0].xKoord,this.ucitanObjekat.prostorije[0].yKoord,
          this.ucitanObjekat.prostorije[0].xKoord+this.ucitanObjekat.prostorije[0].duzina,
          this.ucitanObjekat.prostorije[0].yKoord+this.ucitanObjekat.prostorije[0].sirina,
          this.ucitanObjekat.prostorije[1].xKoord,this.ucitanObjekat.prostorije[1].yKoord,
          this.ucitanObjekat.prostorije[1].xKoord+this.ucitanObjekat.prostorije[1].duzina,
          this.ucitanObjekat.prostorije[1].yKoord+this.ucitanObjekat.prostorije[1].sirina)){
            if(!this.proveriKontkatk(this.ucitanObjekat.prostorije[0].xKoord,this.ucitanObjekat.prostorije[0].yKoord,
              this.ucitanObjekat.prostorije[0].xKoord+this.ucitanObjekat.prostorije[0].duzina,
              this.ucitanObjekat.prostorije[0].yKoord+this.ucitanObjekat.prostorije[0].sirina,
              this.ucitanObjekat.prostorije[2].xKoord,this.ucitanObjekat.prostorije[2].yKoord,
              this.ucitanObjekat.prostorije[2].xKoord+this.ucitanObjekat.prostorije[2].duzina,
              this.ucitanObjekat.prostorije[2].yKoord+this.ucitanObjekat.prostorije[2].sirina)){
                return false;
              }
          }
          if(!this.proveriKontkatk(this.ucitanObjekat.prostorije[0].xKoord,this.ucitanObjekat.prostorije[0].yKoord,
            this.ucitanObjekat.prostorije[0].xKoord+this.ucitanObjekat.prostorije[0].duzina,
            this.ucitanObjekat.prostorije[0].yKoord+this.ucitanObjekat.prostorije[0].sirina,
            this.ucitanObjekat.prostorije[1].xKoord,this.ucitanObjekat.prostorije[1].yKoord,
            this.ucitanObjekat.prostorije[1].xKoord+this.ucitanObjekat.prostorije[1].duzina,
            this.ucitanObjekat.prostorije[1].yKoord+this.ucitanObjekat.prostorije[1].sirina)){
              if(!this.proveriKontkatk(this.ucitanObjekat.prostorije[1].xKoord,this.ucitanObjekat.prostorije[1].yKoord,
                this.ucitanObjekat.prostorije[1].xKoord+this.ucitanObjekat.prostorije[1].duzina,
                this.ucitanObjekat.prostorije[1].yKoord+this.ucitanObjekat.prostorije[1].sirina,
                this.ucitanObjekat.prostorije[2].xKoord,this.ucitanObjekat.prostorije[2].yKoord,
                this.ucitanObjekat.prostorije[2].xKoord+this.ucitanObjekat.prostorije[2].duzina,
                this.ucitanObjekat.prostorije[2].yKoord+this.ucitanObjekat.prostorije[2].sirina)){
                  return false;
                }
            }
            if(!this.proveriKontkatk(this.ucitanObjekat.prostorije[2].xKoord,this.ucitanObjekat.prostorije[2].yKoord,
              this.ucitanObjekat.prostorije[2].xKoord+this.ucitanObjekat.prostorije[2].duzina,
              this.ucitanObjekat.prostorije[2].yKoord+this.ucitanObjekat.prostorije[2].sirina,
              this.ucitanObjekat.prostorije[1].xKoord,this.ucitanObjekat.prostorije[1].yKoord,
              this.ucitanObjekat.prostorije[1].xKoord+this.ucitanObjekat.prostorije[1].duzina,
              this.ucitanObjekat.prostorije[1].yKoord+this.ucitanObjekat.prostorije[1].sirina)){
                if(!this.proveriKontkatk(this.ucitanObjekat.prostorije[0].xKoord,this.ucitanObjekat.prostorije[0].yKoord,
                  this.ucitanObjekat.prostorije[0].xKoord+this.ucitanObjekat.prostorije[0].duzina,
                  this.ucitanObjekat.prostorije[0].yKoord+this.ucitanObjekat.prostorije[0].sirina,
                  this.ucitanObjekat.prostorije[2].xKoord,this.ucitanObjekat.prostorije[2].yKoord,
                  this.ucitanObjekat.prostorije[2].xKoord+this.ucitanObjekat.prostorije[2].duzina,
                  this.ucitanObjekat.prostorije[2].yKoord+this.ucitanObjekat.prostorije[2].sirina)){
                    return false;
                  }
              }
      }
  
      return true;
    }
      //proverava ispravnost pozicije vrata pri ucitavanju objekta
  //sirina vrata je 5--> od ivice prostorije mora da bude udaljena minimum 5
  //sirina i duzina prostorije moraju biti vece od 20--> jer su dimenzije vrata 20*10
  proveriProstoriju(p:Prostorija){
    if(p.duzina<20||p.sirina<20 || p.xKoord<0 || p.yKoord<0 || p.yVrata<0 ||p.xVrata<0){
      return false;
    }
    if(p.xKoord==p.xVrata&&p.yVrata>=5+p.yKoord&&p.yVrata<=p.yKoord+p.sirina-5){
      return true;
    }
    if(p.yVrata==p.yKoord&&p.xVrata>=p.xKoord+5&&p.xVrata<=p.xKoord+p.duzina-5){
      return true;
    }
    if(p.yVrata==p.yKoord+p.sirina&&p.xVrata>=p.xKoord+5&&p.xVrata<=p.xKoord+p.duzina-5){
      return true;
    }
    if(p.xVrata==p.xKoord+p.duzina&&p.yVrata>=5+p.yKoord&&p.yVrata<=p.yKoord+p.sirina-5){
      return true;
    }
    return false;
  }

  //proverava da li se 2 pravoug. dodiruju, vraca false ako se preklapaju ili ne dodiruju
  proveriKontkatk(x1,y1,xk1,yk1,x2,y2,xk2,yk2){
    if(x1==xk2||x2==xk1){
      return true;
    }
    if(yk1==y2||yk2==y1){
      return true;
    }
    return false;
  }
 
}
