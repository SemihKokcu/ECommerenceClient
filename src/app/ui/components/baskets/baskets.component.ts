import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { UpdateBasketItem } from 'src/app/contracts/basket/update-basket-item';
import { CreateOrder } from 'src/app/contracts/order/create_order';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

declare var $:any
@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,private basketService:BasketService,private orderService:OrderService,
    private toastrService:CustomToastrService,private router:Router) {super(spinner) }

basketItems:ListBasketItem[];

  async ngOnInit():Promise<void> {

    this.showSpinner(SpinnerType.BallAtom);
    this.basketItems = await this.basketService.get();
    this.hideSpinner(SpinnerType.BallAtom);
  }

  async changeQauntity(object:any){
    this.showSpinner(SpinnerType.BallAtom)
    const basketItemId = object.target.attributes["id"].value
    const quantity:number = object.target.value;
    const basketItem:UpdateBasketItem = new UpdateBasketItem();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.BallAtom)

  }

  async removeBasketItem(basketItemId:string){
    this.showSpinner(SpinnerType.BallAtom)
      await this.basketService.remove(basketItemId)
      $("."+basketItemId).fadeOut(500,()=>{this.hideSpinner(SpinnerType.BallAtom)})

  }

   async complateShopping(){

    this.showSpinner(SpinnerType.BallAtom);
    const order:CreateOrder = new CreateOrder();
    order.address= "Yeni Mahalle";
    order.description = "güzel yapın lo"
    await this.orderService.createOrder(order);
    this.hideSpinner(SpinnerType.BallAtom);
    this.toastrService.message("Sipariş alınmıştır.","Sipariş oluşturuldu",{
      messageType:ToastrMessageType.Info,
      position:ToastrPosition.TopRight})
    this.router.navigate(["/"]);
  
    }


}
