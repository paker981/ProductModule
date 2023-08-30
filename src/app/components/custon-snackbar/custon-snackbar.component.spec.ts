import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustonSnackbarComponent } from './custon-snackbar.component';

describe('CustonSnackbarComponent', () => {
  let component: CustonSnackbarComponent;
  let fixture: ComponentFixture<CustonSnackbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustonSnackbarComponent]
    });
    fixture = TestBed.createComponent(CustonSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
