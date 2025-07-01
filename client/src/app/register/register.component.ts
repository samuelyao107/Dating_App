import { Component,  inject,  input,  OnInit,  output, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
   private accountService = inject(AccountService);
   private toastr = inject(ToastrService);
   model: any = {}
   registerForm: FormGroup = new FormGroup({});
   cancelRegister = output<boolean>();
   
  ngOnInit(): void {
     this.initializeForm();
   }

   initializeForm(){
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')])
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
