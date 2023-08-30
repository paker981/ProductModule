import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custon-snackbar',
  templateUrl: './custon-snackbar.component.html',
  styleUrls: ['./custon-snackbar.component.css']
})
export class CustonSnackbarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) protected data: any){}

  closeSnackbar(){
    this.data.snackBar.dismiss();
  }

  static openErrorSnackBar(snackBar: MatSnackBar,message: string, action: string){ // TODO: przenieść jako static do CustonSnackbarComponent
    snackBar.openFromComponent(CustonSnackbarComponent,{
      data:{
        message: message,
        action: action,
        icon: 'report-problem',
        snackBar: snackBar
      },
      panelClass: 'error-snackbar'
    })
  }

  static openSuccessSnackBar(snackBar: MatSnackBar,message: string, action: string){
    snackBar.openFromComponent(CustonSnackbarComponent,{
      data:{
        message: message,
        action: action,
        icon: 'done',
        snackBar: snackBar
      },
      panelClass: 'success-snackbar'
    })
  }

  /*
  static open(matDialog: MatDialog) {

  }
  */
}
