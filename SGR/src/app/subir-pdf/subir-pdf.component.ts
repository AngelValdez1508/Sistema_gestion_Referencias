import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subir-pdf',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './subir-pdf.component.html',
  styleUrl: './subir-pdf.component.scss'
})
export class SubirPDFComponent {

  constructor(private router: Router){}

  navegarHome(): void{
    this.router.navigate(['/home'])
  }

  navegarMisReferencias(): void{
    this.router.navigate(['/mis-referencias'])
  }

}
