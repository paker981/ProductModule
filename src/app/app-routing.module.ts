import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './modules/product/product-list/product-list.component';
import { EditProductComponent } from './modules/product/edit-product/edit-product.component';
import { ProductResolver } from './modules/product/resolvers/product.resolver';

const routes: Routes = [
  {
    path: 'list',
    component: ProductListComponent,
  },
  {
    path: 'edit/:id',
    component: EditProductComponent,
    resolve: { product: ProductResolver }
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
