import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  constructor(private authservice: AuthService, private router: Router){}

  logout(){
    this.authservice.logout(); //llama al metodo de cierre de sesion
  }

  navegarSubirPDF(): void{
    this.router.navigate(['/subir-pdf'])
  }

  navegarMisReferencias(): void{
    this.router.navigate(['/mis-referencias'])
  }

}
