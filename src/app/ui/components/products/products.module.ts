import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MatIconModule } from '@angular/material/icon';
import { CategoryComponent } from './list/category/category.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ListComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:ProductsComponent},

    ]),
    MatIconModule
  ]
})
export class ProductsModule { }
