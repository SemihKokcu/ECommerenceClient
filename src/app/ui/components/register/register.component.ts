import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { CreateUser } from 'src/app/contracts/user/create_user';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent extends BaseComponent implements OnInit {

  frm:FormGroup;
  constructor(spinner:NgxSpinnerService, private formBuilder:FormBuilder,private userService:UserService,private toastrService:CustomToastrService) {
    super(spinner);
  }
  ngOnInit(): void {
      this.frm = this.formBuilder.group({
        name: ["",[Validators.required,Validators.maxLength(30),Validators.minLength(3)]],
        surName:["",[Validators.required,Validators.maxLength(30),Validators.minLength(2)]],
        userName:["",[Validators.required,Validators.maxLength(30),Validators.minLength(5)]],
        email:["",[Validators.required,Validators.maxLength(250),Validators.email]],
        password:["",[Validators.required,Validators.maxLength(30),Validators.minLength(6)]],
        rePassword:["",[Validators.required,Validators.maxLength(30),Validators.minLength(6)]]
      },{validators:(group:AbstractControl):ValidationErrors|null=>{
        let password = group.get("password").value;
        let rePassword = group.get("rePassword").value;
        return password === rePassword ?null:{notSame:true};
      }});
  }

  get component(){
    return this.frm.controls;
  }
  submitted:boolean = false;
  async onSubmit(user:User){
    this.submitted = true;
    if (this.frm.invalid) {
      return;
    }
    const result:CreateUser = await this.userService.create(user);
    if (result.succeded) {
      this.toastrService.message(result.message,"Başarılı",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight})
    }
    else{
      this.toastrService.message(result.message,"Hata",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopRight})
    }
  }
}