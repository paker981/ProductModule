import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product, ProductBody, ProductForm } from '../interfaces/product.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router, mapToCanActivate } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, delay, map, of, takeUntil, tap } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { CustomSnackbarService } from 'src/app/services/custom-snackbar.service';
import { productForm } from 'src/app/helpers/formProduct';
import { CustonSnackbarComponent } from 'src/app/components/custon-snackbar/custon-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  
})
export class EditProductComponent implements OnInit {

  protected form: FormGroup<ProductForm> = productForm;
  protected data!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location
    ){}


  ngOnInit(): void {
    this.route.data.pipe(
      untilDestroyed(this),
      map(({data}) => data),
      catchError((err)=>{
        CustonSnackbarComponent.openErrorSnackBar(this.snackBar,err.message,'Try again!')
        return of({})
      })
    ).subscribe((data: {product: Product}) => this.setValueInControls(data['product']))
  }

  setValueInControls(data: Product){
    this.data = data;
    if(!data){
      return;
    }
    this.form.controls.title.setValue(data.title);
    this.form.controls.price.setValue(data.price);
    this.form.controls.description.setValue(data.description);
    this.form.controls.image.setValue(data.image);
    this.form.controls.category.setValue(data.category);
  }

  onSubmit(){
    if(this.form.invalid){
      CustonSnackbarComponent.openErrorSnackBar(this.snackBar,'Form invalid!', 'Close')
      return;
    }

    this.productService.update(this.data!.id,this.form.value as ProductBody).pipe(
      tap(() => CustonSnackbarComponent.openSuccessSnackBar(this.snackBar,'Product editted!','Close')),
      catchError(err => {
          CustonSnackbarComponent.openErrorSnackBar(this.snackBar,err.message,'Try again!')
          return of({} as Product); // Zwrócenie błędu jako obiektu zgodnego z typem w add()
        })
      )
    .subscribe(() => this.router.navigate(['list']))
  }

  navigateBack(){
    this.location.back()
  }
}
