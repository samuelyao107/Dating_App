import { Component,  inject,  input,  OnInit,  output, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DatePickerComponent } from '../_forms/date-picker/date-picker.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TextInputComponent, DatePickerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
   private accountService = inject(AccountService);
   private toastr = inject(ToastrService);
   private fb= inject(FormBuilder);
   model: any = {}
   registerForm: FormGroup = new FormGroup({});
   cancelRegister = output<boolean>();
   maxDate = new Date();
   
  ngOnInit(): void {
     this.initializeForm();
     this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
   }

   initializeForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });
    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.registerForm.controls['confirmPassword'].updateValueAndValidity();
    });
   }
   register(){

    console.log(this.registerForm.value);
  //   this.accountService.register(this.model).subscribe({
  //     next: response => {
  //       console.log(response);
  //       this.cancel();
  //     },
  //     error: error => this.toastr.error(error.error)
  //   })
   }

   cancel(){
    this.cancelRegister.emit(false);
   }

   matchValues(matchTo:string): ValidatorFn{
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true};
    }
   }
}
