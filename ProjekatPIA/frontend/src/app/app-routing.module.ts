import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { KlijentComponent } from './klijent/klijent.component';
import { AgencijaComponent } from './agencija/agencija.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { DetaljiAgencijaComponent } from './detalji-agencija/detalji-agencija.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { ProfilComponent } from './profil/profil.component';
import { AzuriranjeProfilaComponent } from './azuriranje-profila/azuriranje-profila.component';
import { ObjektiComponent } from './objekti/objekti.component';
import { PrikaziSkicuComponent } from './prikazi-skicu/prikazi-skicu.component';
import { IzmenaObjektaComponent } from './izmena-objekta/izmena-objekta.component';
import { AgencijeKlijentComponent } from './agencije-klijent/agencije-klijent.component';
import { ZahtevSaradnjaComponent } from './zahtev-saradnja/zahtev-saradnja.component';
import { PosloviKlijentComponent } from './poslovi-klijent/poslovi-klijent.component';
import { PregledPonudeComponent } from './pregled-ponude/pregled-ponude.component';
import { OstaviKomentarComponent } from './ostavi-komentar/ostavi-komentar.component';
import { PosloviAgencijaComponent } from './poslovi-agencija/poslovi-agencija.component';
import { PrihvatiZahtevComponent } from './prihvati-zahtev/prihvati-zahtev.component';
import { PosaoNapredakComponent } from './posao-napredak/posao-napredak.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AdminComponent } from './admin/admin.component';
import { ZaposleniAgencijaComponent } from './zaposleni-agencija/zaposleni-agencija.component';
import { DodajRadnikaComponent } from './dodaj-radnika/dodaj-radnika.component';
import { AzurirajRadnikaComponent } from './azuriraj-radnika/azuriraj-radnika.component';
import { RadniciAgencijaComponent } from './radnici-agencija/radnici-agencija.component';

const routes: Routes = [
  {path:"", component:PocetnaComponent},
  {path:"klijent",component:KlijentComponent},
  {path:"agencija", component:AgencijaComponent},
  {path:"registracija",component:RegistracijaComponent},
  {path:"detaljiAgencija",component:DetaljiAgencijaComponent},
  {path:"promenaLozinke",component:PromenaLozinkeComponent},
  {path:"profil",component:ProfilComponent},
  {path:"azuriranjeProfila",component:AzuriranjeProfilaComponent},
  {path:"objekti", component:ObjektiComponent},
  {path:"prikaziSkicu",component:PrikaziSkicuComponent},
  {path:"izmenaObjekta",component:IzmenaObjektaComponent},
  {path:"agencijeKlijent",component:AgencijeKlijentComponent},
  {path:"zahtevSaradnja",component:ZahtevSaradnjaComponent},
  {path:"posloviKlijent",component:PosloviKlijentComponent},
  {path:"pregledPonude", component:PregledPonudeComponent},
  {path:"ostaviKomentar", component:OstaviKomentarComponent},
  {path:"posloviAgencija",component:PosloviAgencijaComponent},
  {path:"prihvatiZahtev", component:PrihvatiZahtevComponent},
  {path:"posaoNapredak",component:PosaoNapredakComponent},
  {path:"loginAdmin",component:LoginAdminComponent},
  {path:"admin",component:AdminComponent},
  {path:"zaposleniAgencija",component:ZaposleniAgencijaComponent},
  {path:"dodajRadnika",component:DodajRadnikaComponent},
  {path:"azurirajRadnika",component:AzurirajRadnikaComponent},
  {path:"radniciAgencija",component:RadniciAgencijaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
