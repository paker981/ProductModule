import { Component, ViewChild, signal } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { catchError, config, filter, of, switchMap, tap, throttleTime } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Product, ProductBody } from '../interfaces/product.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { __param } from 'tslib';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from '../dialogs/product-dialog/product-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarService, SnackBarType } from 'src/app/services/custom-snackbar.service';
import { CustonSnackbarComponent } from 'src/app/components/custon-snackbar/custon-snackbar.component';

@UntilDestroy()
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @ViewChild(MatPaginator) protected paginatior !: MatPaginator;
  @ViewChild(MatSort) protected sort !: MatSort;

  protected dataSource!: MatTableDataSource<Product>
  protected readonly displayedColumns: string[] = ["id","title","price","category","description","image","action"];
  protected filterInput = signal<string>('');
  
  constructor(
    private productService: ProductServiceService, 
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    
    ){
    this.productService.getAll().pipe(
      // throttleTime(500),
      untilDestroyed(this),
      tap({
        error: (err=>CustonSnackbarComponent.openErrorSnackBar(this.snackBar,err.message, 'Try again!'))
      }),
      catchError(()=>of([] as Product[]))
    ).subscribe((data)=>this.setDataSource(data))

    this.filterInput.update
  }

  private setDataSource(data: Product[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginatior;
    this.dataSource.sort = this.sort;
  }

  protected filterTable(value: string){
    this.filterInput.set(value)
    this.dataSource.filter = value;
  }

  protected edit(id: number){
    console.log(id)
    this.router.navigate(['edit/',id])
  }

  protected delete(id: number){
    this.productService.delete(id).pipe(
      tap(() => CustonSnackbarComponent.openSuccessSnackBar(this.snackBar,'Product deleted!', 'Okey')),
      catchError(err => {
          CustonSnackbarComponent.openErrorSnackBar(this.snackBar,err.message, 'Try again!');
          return of({} as Product); // Zwrócenie błędu jako obiektu zgodnego z typem w add()
      })
    ).subscribe();
  }

  protected add(){
    const dialogRef = this.dialog.open(ProductDialogComponent, { height:'400px', width: '400px' });

    dialogRef.afterClosed().pipe(
      filter(Boolean),
      untilDestroyed(this),
      switchMap((data: ProductBody) =>
        this.productService.add(data).pipe(
          tap(() => CustonSnackbarComponent.openSuccessSnackBar(this.snackBar,'Product added!', 'Okey')),
          catchError(err => {
              CustonSnackbarComponent.openErrorSnackBar(this.snackBar,err.message, 'Try again!');
              return of({} as Product); // Zwrócenie błędu jako obiektu zgodnego z typem w add()
          })
      )
    )).subscribe()
  }
}



