import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Objekat } from '../models/objekat';
import { KlijentService } from '../klijent.service';
import { Router } from '@angular/router';
import { Prostorija } from '../models/prostorija';

@Component({
  selector: 'app-objekti',
  templateUrl: './objekti.component.html',
  styleUrls: ['./objekti.component.css']
})
export class ObjektiComponent implements OnInit {

  @ViewChild('canvas', {static:true}) myCanvas!: ElementRef;

  constructor(private klijentService:KlijentService, private router:Router) { }
  
  objProstorija1:Objekat;
  objProstorija2:Objekat;
  objProstorija3:Objekat;
  ucitanObjekat:Objekat;
  errorObjekat:string;
  korisnik:Korisnik;
  mojiObjekti:Objekat[]=[];
  dodavanje:string;
  tip:string;
  adresa:string;
  kvadratura:number;
  brojProstorija:number;
  canvas:HTMLCanvasElement
  context:CanvasRenderingContext2D
  ngOnInit(): void {
    this.korisnik=JSON.parse(sessionStorage.getItem('korisnik'));
    this.ucitanObjekat=null;
    this.adresa=null;
    this.brojProstorija=null;
    this.tip=null;
    this.kvadratura=null;
    this.dodavanje=null;
    this.ocisti();
    this.inicijalizujObjekteZaSkicu();
    this.klijentService.dohvatiObjekte(this.korisnik.korisnickoIme).subscribe((obj:Objekat[])=>{
      this.mojiObjekti=obj;
    })

  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  nazadDoMenija(){
    this.router.navigate(["klijent"]);
  }

  obrisiObjekat(objekat:Objekat){
    this.klijentService.obrisiObjekat(objekat._id).subscribe((resp)=>{
      if(resp['message']=='ok'){
        this.ngOnInit();
      }
    })
  }

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

  nacrtajPredefinisanuSkicu(objekat:Objekat){
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

  promenaProstorija(){
    this.inicijalizujObjekteZaSkicu();
    this.prikaziPredefinisanuSkicu();
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

  prikaziSkicu(objekat){
    this.router.navigate(['prikaziSkicu',{objekat:JSON.stringify(objekat), skica:'skica'}]);
  }

  izmeniObjekat(objekat){
    this.router.navigate(['izmenaObjekta',{objekat:JSON.stringify(objekat)}]);
  }
  //sluzi da obrise zaostalu skicu ukoliko takva postoji
  ocisti(){
      this.ucitanObjekat=null;
      this.tip=null;
      this.brojProstorija=null;
      this.adresa=null;
      this.kvadratura=null;
      this.errorObjekat=null;
      this.canvas=this.myCanvas.nativeElement;
      this.context=this.canvas.getContext('2d');
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

  dodajObjekat(){
    if(this.dodavanje=='ucitaj'){
      if(this.ucitanObjekat==null){
        this.errorObjekat="Niste ucitali objekat!";
        return;
      }
      this.ucitanObjekat.korisnik=this.korisnik.korisnickoIme;
      this.klijentService.dodajObjekat(this.ucitanObjekat).subscribe((resp)=>{
        if(resp['message']=='ok'){
          alert("Uspesno ste dodali objekat!");
          this.ngOnInit();
        }
      })
    }else{
      if(this.tip==null||this.tip==""||this.adresa==null||this.adresa==""
      ||this.brojProstorija>3||this.brojProstorija<1||this.brojProstorija==null||
      this.kvadratura==0||this.kvadratura==null){
        this.errorObjekat="Morate uneti sve podatke! Broj prostorije sme da bude minimalno 1 maksimalno 3. Kvadratura ne sme biti 0!"
        return;
      }
      //dodaje se predefinisana skica prostorija
      let objekat=new Objekat();
      objekat.tip=this.tip;
      objekat.adresa=this.adresa;
      objekat.brojProstorija=this.brojProstorija;
      objekat.kvadratura=this.kvadratura;
      objekat.korisnik=this.korisnik.korisnickoIme;
      objekat._id=null;
      objekat.prostorije=[];
      if(this.brojProstorija==1){
        objekat.prostorije=this.objProstorija1.prostorije;  
      }else if(this.brojProstorija==2){
        objekat.prostorije=this.objProstorija2.prostorije;
      }else{
        objekat.prostorije=this.objProstorija3.prostorije;
      }
      this.klijentService.dodajObjekat(objekat).subscribe((resp)=>{
        if(resp['message']=='ok'){
          alert("Uspesno ste dodali objekat!")
          this.ngOnInit();
        }
      })
    }
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
          this.prikaziObjekat();
       }else{
        this.errorObjekat="Svaka prostorija mora da se dodiruje bar sa jednom. Vrata u svakoj prostoriji moraju biti na zidu. Prostorije se ne semeju preklapati!";
        this.ucitanObjekat=null;
       } 
		  }
    }
    else{
      this.errorObjekat="Svaka prostorija mora da se dodiruje bar sa jednom. Vrata u svakoj prostoriji moraju biti na zidu. Prostorije se ne semeju preklapati!";
      this.ucitanObjekat=null;
      this.prikaziObjekat();
    }
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

  proveriIspravnostObjekta(){
    if(this.ucitanObjekat==null){
      return false;
    }
    if(this.ucitanObjekat.tip==null||this.ucitanObjekat.tip==""||
    this.ucitanObjekat.adresa==null||this.ucitanObjekat.adresa==""||
    this.ucitanObjekat.brojProstorija==null||this.ucitanObjekat.brojProstorija<1||this.ucitanObjekat.brojProstorija>3
    ||this.ucitanObjekat.kvadratura==null ||this.ucitanObjekat.kvadratura<=0
    ||this.ucitanObjekat.prostorije==null||this.ucitanObjekat.prostorije.length<1||
    this.ucitanObjekat.prostorije.length>3 || this.ucitanObjekat.prostorije.length!=this.ucitanObjekat.brojProstorija){
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

  //za crtanje skica iz JSON fajla
  prikaziObjekat(){
    this.canvas=this.myCanvas.nativeElement;
    this.context=this.canvas.getContext('2d');
    if(this.ucitanObjekat!=null){
      for(let p of this.ucitanObjekat.prostorije){
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
          //p.xVrata==p.xKoord+p.duzina
          this.context.fillRect(p.xVrata-20,p.yVrata-5,20,10);
          this.context.strokeRect(p.xVrata-20,p.yVrata-5,20,10);
        }
      }
    }
    else{
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}
