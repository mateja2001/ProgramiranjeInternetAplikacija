import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
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
import { RadniciAgencijaComponent } from './radnici-agencija/radnici-agencija.component'

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    KlijentComponent,
    AgencijaComponent,
    RegistracijaComponent,
    DetaljiAgencijaComponent,
    PromenaLozinkeComponent,
    ProfilComponent,
    AzuriranjeProfilaComponent,
    ObjektiComponent,
    PrikaziSkicuComponent,
    IzmenaObjektaComponent,
    AgencijeKlijentComponent,
    ZahtevSaradnjaComponent,
    PosloviKlijentComponent,
    PregledPonudeComponent,
    OstaviKomentarComponent,
    PosloviAgencijaComponent,
    PrihvatiZahtevComponent,
    PosaoNapredakComponent,
    LoginAdminComponent,
    AdminComponent,
    ZaposleniAgencijaComponent,
    DodajRadnikaComponent,
    AzurirajRadnikaComponent,
    RadniciAgencijaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
