import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/constants/base-url';
import { CreateBasketItem } from 'src/app/contracts/basket/create-basket-item';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { List_Product } from 'src/app/contracts/list_products';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  
  /**
   *
   */
  constructor(spinner:NgxSpinnerService,private productService:ProductService,private activatedRoute:ActivatedRoute,
    private fileService:FileService,private basketService:BasketService,private customToastrService:CustomToastrService) 
  {
    super(spinner);
  }


  currentPageNo:number;
  totalProductCount:number;
  totalPageCount:number;
  products:List_Product[];
  pageSize:number = 12
  pageList:number[]=[];
  baseStroageUrl:BaseUrl;
  async ngOnInit() 
  {
    this.baseStroageUrl = await this.fileService.getBaseStorageUrl(); 

    this.activatedRoute.params.subscribe(async params=>{
    this.currentPageNo = parseInt(params["pageNo"] ?? 1);
      const data:{totalProductCount:number,products:List_Product[]} =  await this.productService.getProductList(this.currentPageNo-1,this.pageSize,()=>{

      },
      (errorMessage) =>{
      });
      this.products = data.products;
      this.products = this.products.map<List_Product>(p => {
        const listProduct: List_Product = {
          id: p.id,
          createDate: p.createDate,
          imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : "",
          name: p.name,
          price: p.price,
          stock: p.stock,
          updateDate: p.updateDate,
          productImageFiles: p.productImageFiles
        };

        return listProduct;
      });

      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount/this.pageSize);

      this.pageList = [];
      if (this.currentPageNo -3 <=0) {
        for(let i=1;i<=7;i++){
          this.pageList.push(i);
        }
      }
      else if(this.currentPageNo +3 >= this.totalPageCount)
      for(let i = this.totalPageCount-6;i<=this.totalPageCount;i++){
        this.pageList.push(i);
      }
      else{
        for(let i = this.currentPageNo-3;i<=this.currentPageNo+3;i++){
          this.pageList.push(i);
        }
      }
    })
    

    
  }

  async addToBasket(product:List_Product){
    this.showSpinner(SpinnerType.BallAtom);
    let _basketItem:CreateBasketItem = new CreateBasketItem();
    _basketItem.productId= product.id;
    _basketItem.quantity=1;
    await this.basketService.add(_basketItem);
    this.hideSpinner(SpinnerType.BallAtom);
    this.customToastrService.message(`${product.name} sepete eklenmiştir`,'Sepete Eklendi',{
      messageType : ToastrMessageType.Success,
      position: ToastrPosition.TopLeft
    })
  }

}