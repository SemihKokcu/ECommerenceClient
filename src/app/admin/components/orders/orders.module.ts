import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogModule } from '../../../dialogs/dialog.module';
import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders.component';
import { DeleteModule } from 'src/app/directives/admin/delete.directive.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    OrdersComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: OrdersComponent }
    ]),
    MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule,
    DialogModule,DeleteModule,MatIconModule
  ]
})
export class OrdersModule { }