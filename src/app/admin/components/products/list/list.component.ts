import {  Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/create_product';
import { List_Product } from 'src/app/contracts/list_products';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $:any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(
    private alertifyService:AlertifyService,
    spinner:NgxSpinnerService,
    private productService:ProductService,
    private dialogService:DialogService

    ) {
    super(spinner);
    }

  displayedColumns: string[] = ['Name', 'Stock', 'Price', 'CreatedDate','UpdatedDate',"images","edit","delete"];
  dataSource:MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;


   async ngOnInit()
  {
    await this.getProducts()
  }


  async getProducts()
  {
    this.showSpinner(SpinnerType.BallAtom);
    const allProducts:{totalProductCount:number,products:List_Product[]} = await this.productService.getProductList(
      this.paginator ? this.paginator.pageIndex:0,
      this.paginator ? this.paginator.pageSize:5,
       ()=>this.hideSpinner(SpinnerType.BallAtom),
       (errorMessage)=>this.alertifyService.message(errorMessage,{
         dismissOthers:true,
         messageType:MessageType.Error,
         position:Position.TopRight
       }))
       this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
       this.paginator.length = allProducts.totalProductCount;
  }
  async pageChange()
  {
    await this.getProducts();
  }

  addProductImage(id:string){
    this.dialogService.openDialog({
      componentType:SelectProductImageDialogComponent,
      data:id,
      options:{
         width:"1500px"
      }
    })
  }
}
