import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private router:Router, private adminService:AdminService) { }
  korIme:string;
  lozinka:string;
  poruka:string;
  ngOnInit(): void {
  }

  login(){
    this.adminService.login(this.korIme,this.lozinka).subscribe((kor:Korisnik)=>{
      if(kor!=null&&kor.odobren){
        if(kor.tip!='admin'){
          this.poruka='Vi niste admin!';
          return;
        }
        sessionStorage.setItem('admin',JSON.stringify(kor));
        this.router.navigate(['admin']);
      }
      else{
        this.poruka="Pogresni kredencijali!";
      }
    })
  }
  pocetna(){
    this.router.navigate(['']);
  }
}
