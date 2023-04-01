import { List_Product_Images } from "./list-product-images";

export class List_Product {
  id:string;
  name:string;
  stock:number;
  price:number;
  createDate:Date;
  updateDate:Date;
  productImageFiles?:List_Product_Images[]
  imagePath:string
}
