import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './service/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular_crud_operation';
  displayedColumns: string[] = ['productName', 'category', 'freshness','date', 'price',
  'comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog , private api:ApiService){}
  ngOnInit(): void {
   this.getAllProducts()
  }
  openDialog() {
    this.dialog.open(DialogComponent,{
      width:'30%'
    });
  }
  getAllProducts(){
    this.api.getProduct().subscribe({
      next:(res)=> {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      },
      error:(err)=>{
        alert("Error while fething records")
      }
    })
  }

  editProduct(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val=='update'){
        this.getAllProducts()
      }
    })

  }
  deleteProduct(id:number){
    this.api.deleteProduct(id).subscribe({
      next:(res)=>{
        alert("Product deleted successfully");
        this.getAllProducts();
      },
      error:()=>{
        alert("Error while deleting the product")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 

}





