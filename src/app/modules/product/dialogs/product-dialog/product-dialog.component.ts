import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductForm } from '../../interfaces/product.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { productForm } from 'src/app/helpers/formProduct';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent {

  protected form: FormGroup<ProductForm> = productForm;

  constructor(private dialogRef: MatDialogRef<ProductDialogComponent>){}


  submitForm(): void {
    if(this.form.invalid){
      return;
    }
    this.dialogRef.close(this.form.value);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
