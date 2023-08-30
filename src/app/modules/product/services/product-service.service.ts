import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductBody } from '../interfaces/product.interface';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private readonly apiUrl = 'https://fakestoreapi.com/products/'; 

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl)
  }

  get(id: number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + id).pipe(
      delay(500),
    );
  }
  
  add(data: ProductBody): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, data);
  }

  update(id: number, data: ProductBody): Observable<ProductBody> {
    return this.http.put<Product>(this.apiUrl + id,data)
  }

  delete(id: number): Observable<Product> {
    return this.http.delete<Product>(this.apiUrl + id);
  }

}
