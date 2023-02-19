import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyOptions, AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $:any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element:ElementRef,
    private _renderer: Renderer2,
    private httpClientService:HttpClientService,
    private spinner:NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService:AlertifyService
    )
    {
      const img = _renderer.createElement("img");
      img.setAttribute("src","../../../../assets/delete.png");
      img.setAttribute("style","cursor:pointer;");
      img.width=25;
      img.heigth=25;
      _renderer.appendChild(this.element.nativeElement,img)

    }
    @Input() id:string; // id al
    @Input() controller:string; //silme işlemi için controller değerimi alıyoruz
    @Output() callback: EventEmitter<any> = new EventEmitter();
    @HostListener("click") // click olduğunda çalışır
    async onClick(){
      this.openDialog(async ()=>
      {
            this.spinner.show(SpinnerType.BallAtom);
            const td:HTMLTableCellElement= this.element.nativeElement;
            this.httpClientService.delete({
              controller:this.controller
            },this.id).subscribe(()=>{
              $(td.parentElement).animate({
                opacity:0,
                left:"+=50",
                height:"toogle"
              },700,()=>{
                this.callback.emit()
                this.alertifyService.message("Ürün başarıyla silinmiştir",{
                  dismissOthers:true,
                  messageType:MessageType.Success,
                  position:Position.TopRight
                })
              })
            },(errorResponse:HttpErrorResponse)=>{
              this.spinner.hide(SpinnerType.BallAtom);
              this.alertifyService.message("Ürün silinemedi",{
                dismissOthers:true,
                messageType:MessageType.Error,
                position:Position.TopRight
              })
            })
      });


    }

    openDialog(afterClosed:any): void {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '250px',
        data: DeleteState.Yes,
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result==DeleteState.Yes) {
          afterClosed();
        }
      });
    }
  }


