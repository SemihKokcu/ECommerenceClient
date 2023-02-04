import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(private alertify:AlertifyService,spinner:NgxSpinnerService ,private productService:ProductService) {super(spinner)}
  ngOnInit(): void {

  }
  create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom);
    const create_product: CreateProduct = new CreateProduct();
    create_product.name = name.value;
    create_product.price= parseFloat(price.value);
    create_product.stock = parseInt(stock.value);
    this.productService.createProduct(create_product,()=>{
      this.hideSpinner(SpinnerType.BallAtom)
      this.alertify.message("product added",
      {
        dismissOthers:true,
        messageType:MessageType.Success,
        position:Position.TopRight
      })
    }
    );
  }
}
