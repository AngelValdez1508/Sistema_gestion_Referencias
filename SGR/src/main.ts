import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter, Route } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { importProvidersFrom } from '@angular/core';
import { HomeComponent } from './app/home/home.component';
import { RegistroUsuarioComponent } from './app/registro-usuario/registro-usuario.component';
import { OlvidePasswordComponent } from './app/olvide-password/olvide-password.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SubirPDFComponent } from './app/subir-pdf/subir-pdf.component';
import { MisReferenciasComponent } from './app/mis-referencias/mis-referencias.component';


const routes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent}, //aun no hago el componente home
  { path: 'registro', component: RegistroUsuarioComponent},
  { path: 'olvide', component: OlvidePasswordComponent},
  { path: 'subir-pdf', component: SubirPDFComponent},
  { path: 'mis-referencias', component: MisReferenciasComponent}

]


bootstrapApplication(AppComponent,{
    providers: [provideRouter(routes), importProvidersFrom(HttpClientModule), provideAnimationsAsync()]
} )
  
