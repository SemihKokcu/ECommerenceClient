import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { DialogService } from '../dialog.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(
    private httpClientService:HttpClientService,
    private alertifyService:AlertifyService,
    private customToastrService:CustomToastrService,
    private dialog:MatDialog,
    private dialogService:DialogService,
    private spinner:NgxSpinnerService
  ) {

  }

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFile(files: NgxFileDropEntry[]) {


    this.files = files;
    const fileData:FormData = new FormData();
    for(const file of files)
    {
      (file.fileEntry as FileSystemFileEntry).file((_file:File)=>{
        fileData.append(_file.name,_file,file.relativePath);
      })
    }
    this.dialogService.openDialog({
      componentType:FileUploadDialogComponent,
      data:FileUploadDialogState.Yes,
      afterClosed:()=>{
        this.spinner.show(SpinnerType.BallAtom);
        const successMessage = "Dosyalar başarı bir şekilde yüklenmiştir";
        const errorMessage = "Dosyalar yüklenememiştir";
        this.httpClientService.post({
          controller:this.options.controller,
          action:this.options.action,
          queryString:this.options.queryString,
          headers:new HttpHeaders({"responseType":"blob"})
        },fileData).subscribe(data=>{
          this.spinner.hide(SpinnerType.BallAtom);
          if (this.options.isAdminPage) {
            this.alertifyService.message(successMessage,{
              dismissOthers:true,
              messageType:MessageType.Success,
              position:Position.TopRight
            })
          }
          else{
            this.customToastrService.message(successMessage,"Başarılı",{
              messageType:ToastrMessageType.Success,
              position:ToastrPosition.TopRight
            })
          }
        },(errorResponse:HttpErrorResponse)=>{
          this.spinner.hide(SpinnerType.BallAtom);
          if (this.options.isAdminPage) {
            this.alertifyService.message(errorMessage,{
              dismissOthers:true,
              messageType:MessageType.Error,
              position:Position.TopRight
            })
          }
          else{
            this.customToastrService.message(errorMessage,"Başarısız",{
              messageType:ToastrMessageType.Error,
              position:ToastrPosition.TopRight
            })
          }
        })
      }
    });


  }


}

export class FileUploadOptions{
 controller?:string;
 action?:string;
 queryString?:string;
 explanation?:string;
 accept?:string;
isAdminPage?:boolean=false;

}
