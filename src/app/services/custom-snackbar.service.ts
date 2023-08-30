import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustonSnackbarComponent } from '../components/custon-snackbar/custon-snackbar.component';

export enum SnackBarType {
  SUCCESS = 'success',
  ERROR = 'error'
}

@Injectable({
  providedIn: 'root'
})
export class CustomSnackbarService {
  // wszystko przeniesione do static metod

  constructor(private snackBar: MatSnackBar) { }

  openErrorSnackBar(message: string, action: string){ // TODO: przenieść jako static do CustonSnackbarComponent
    this.snackBar.openFromComponent(CustonSnackbarComponent,{
      data:{
        message: message,
        action: action,
        icon: 'report-problem',
        snackBar: this.snackBar
      },
      panelClass: 'error-snackbar'
    })
  }

  openSuccessSnackBar(message: string, action: string){
    this.snackBar.openFromComponent(CustonSnackbarComponent,{
      data:{
        message: message,
        action: action,
        icon: 'done',
        snackBar: this.snackBar
      },
      panelClass: 'success-snackbar'
    })
  }
}
