import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductServiceService } from './services/product-service.service';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ProductDialogComponent } from './dialogs/product-dialog/product-dialog.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    ProductListComponent,
    TruncatePipe,
    ProductDialogComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([])
  ],
  exports :[
    ProductListComponent
  ],
  providers: [

  ]

})
export class ProductModule { }
