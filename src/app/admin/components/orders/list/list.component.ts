import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_products';
import { OrderList } from 'src/app/contracts/order/list_product';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    private alertifyService:AlertifyService,
    spinner:NgxSpinnerService,
    private orderService:OrderService,
    private dialogService:DialogService

    ) {
    super(spinner);
    }

  displayedColumns: string[] = ['orderCode', 'userName', 'totalPrice', 'createDate',"delete"];
  dataSource:MatTableDataSource<OrderList> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;


   async ngOnInit()
  {
    await this.getOrders()
  }


  async getOrders()
  {
    this.showSpinner(SpinnerType.BallAtom);
      const allOrders:{totalOrderCount:number,orders:OrderList[]} = await this.orderService.getAllOrder(
      this.paginator ? this.paginator.pageIndex:0,
      this.paginator ? this.paginator.pageSize:5,
       ()=>this.hideSpinner(SpinnerType.BallAtom),
       (errorMessage)=>this.alertifyService.message(errorMessage,{
         dismissOthers:true,
         messageType:MessageType.Error,
         position:Position.TopRight
       }))
       this.dataSource = new MatTableDataSource<OrderList>(allOrders.orders);
       this.paginator.length = allOrders.totalOrderCount;
  }
  async pageChange()
  {
    await this.getOrders();
  }


}
