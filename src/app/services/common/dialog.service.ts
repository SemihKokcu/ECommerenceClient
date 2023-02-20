import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog) { }
  openDialog(dialogParametres:Partial<DialogParametres>): void {
    const dialogRef = this.dialog.open(dialogParametres.componentType, {
      width: dialogParametres.options?.width,
      height:dialogParametres.options?.height,
      position:dialogParametres.options?.position,
      data: dialogParametres.data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result==dialogParametres.data) {
        dialogParametres.afterClosed();
      }
    });
  }
}

export class DialogParametres{
  componentType: ComponentType<any>;
  data:any;
  afterClosed:()=>void;
  options?:Partial<DialogsOptions> = new DialogsOptions();
}
export class DialogsOptions{
  width?:string="250px";
  height?:string;
  position?:DialogPosition;
}
