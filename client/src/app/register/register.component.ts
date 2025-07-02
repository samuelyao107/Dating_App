import { Component,  inject,  input,  OnInit,  output, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DatePickerComponent } from '../_forms/date-picker/date-picker.component';
import { Router } from '@angular/router';

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
   private router = inject(Router);
   registerForm: FormGroup = new FormGroup({});
   cancelRegister = output<boolean>();
   maxDate = new Date();
   validationErrors: string[] | undefined;
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
    const dob = this.getDateOnly(this.registerForm.get('dateOfBirth')?.value);
    this.registerForm.patchValue({dateOfBirth:dob});
    this.accountService.register(this.registerForm.value).subscribe({
      next: _ => this.router.navigateByUrl('/members'),
      error: error => this.validationErrors = error,
    })
   }

   cancel(){
    this.cancelRegister.emit(false);
   }

   matchValues(matchTo:string): ValidatorFn{
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true};
    }
   }

   private getDateOnly(dob: string |undefined){
    if(!dob) return;
    return new Date(dob).toISOString().slice(0, 10);
   }
}
