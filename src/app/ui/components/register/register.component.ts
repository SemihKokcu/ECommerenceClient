import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent implements OnInit {

  frm:FormGroup;
  constructor(private formBuilder:FormBuilder) {

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
  onSubmit(data:User){
    this.submitted = true;
    if (this.frm.invalid) {
      return;
    }
  }
}
