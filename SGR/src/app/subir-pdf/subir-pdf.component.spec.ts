import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirPDFComponent } from './subir-pdf.component';

describe('SubirPDFComponent', () => {
  let component: SubirPDFComponent;
  let fixture: ComponentFixture<SubirPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirPDFComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
