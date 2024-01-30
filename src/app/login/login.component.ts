import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Services } from '../Services/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  code: string;

  constructor(private formBuilder: FormBuilder, private services: Services) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      useremail: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const user = {
        username: this.form.controls['username'].value,
        email: this.form.controls['useremail'].value,
        code: this.services.getRandom()
      };

      this.services.SendEmail(user).subscribe((result: any) => {
        if (result) {
          // email sent successfully, display verification code input field
          this.code = user.code;
        } else {
          // failed to send email, display error message
          console.log('Failed to send email');
        }
      });
    }
  }
}