import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SignalRService } from 'src/app/services/common/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,private alertify:AlertifyService,private singalRService:SignalRService) 
  {
    super(spinner);
    singalRService.start(HubUrls.ProductHub )
  }

  ngOnInit(): void 
  {
    this.singalRService.on(ReceiveFunctions.ProductAddedMessageRecieve,message=>{
      this.alertify.message(message,{messageType:MessageType.Notify,position:Position.TopRight})
    })
  }
  m(){
    this.alertify.message("message",{
      messageType:MessageType.Success,
      delay:5,
      position:Position.TopRight,

    });

  }

  d(){
    this.alertify.dismissAll();
  }
}
