import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { List_Product_Images } from 'src/app/contracts/list-product-images';
import { DialogService } from 'src/app/services/common/dialog.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { BaseDialog } from '../base/base/base-dialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
declare var $:any
@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  constructor(
    dialogRef:MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState|string,
    private productService:ProductService,
    private spinner:NgxSpinnerService,
    private dialogService : DialogService
    ) {
    super(dialogRef);
  }

  images:List_Product_Images[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallAtom);
    this.images = await this.productService.readImage(this.data as string,()=>{
      this.spinner.hide(SpinnerType.BallAtom);
    })
  }

  async deleteImage(imageId:string,event:any)
  {
    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data:DeleteState.Yes,
      afterClosed:async ()=>{
        this.spinner.show(SpinnerType.BallAtom)
        await this.productService.deleteImage(this.data as string,imageId,()=>{
          this.spinner.hide(SpinnerType.BallAtom)
          var card = $(event.srcElement).parent().parent();
          $(card).fadeOut(500);

        })
      }
    })
  }

  showCase(imageId: string) {
    this.spinner.show(SpinnerType.BallAtom);

    this.productService.changeShowcaseImage(imageId, this.data as string, () => {
      this.spinner.hide(SpinnerType.BallAtom);
    });
  }


  @Output() options: Partial<FileUploadOptions>={
    accept:".png,.jpg,.gif,.jpeg",
    action:"upload",
    controller:"products",
    explanation:"Ürün resimleri seçiniz ya da sürükleyiniz",
    isAdminPage:true,
    queryString:`id=${this.data}`
  };

}

export enum SelectProductImageState{
  Close
}
