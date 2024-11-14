import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-referencias',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './mis-referencias.component.html',
  styleUrl: './mis-referencias.component.scss'
})
export class MisReferenciasComponent {

  constructor(private router: Router){}

  navegarSubirPDF(): void{
    this.router.navigate(['/subir-pdf'])
  }

  navegarHome(): void{
    this.router.navigate(['/home'])
  }
}
