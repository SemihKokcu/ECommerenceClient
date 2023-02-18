import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $:any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element:ElementRef,
    private _renderer: Renderer2,
    private productService:ProductService,
    private spinner:NgxSpinnerService
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
    @Output() callback: EventEmitter<any> = new EventEmitter();
    @HostListener("click") // click olduğunda çalışır
    async onClick(){
      this.spinner.show(SpinnerType.BallAtom);
      const td:HTMLTableCellElement= this.element.nativeElement;
      await this.productService.delete(this.id);
     $(td.parentElement).fadeOut(1000,()=>{this.callback.emit()});

    }

}
