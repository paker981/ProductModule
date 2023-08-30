import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Product } from '../interfaces/product.interface';
import { Injectable, inject } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { Observable, filter } from 'rxjs';

export const ProductResolver: ResolveFn<Product> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  productService: ProductServiceService = inject(ProductServiceService)
): Observable<Product> => productService.get(route.params['id']).pipe(
  filter<Product>((data: Product) => !!data)
)
