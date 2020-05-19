import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.models';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';



@Component({
  selector: 'lil-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.message = new Message('danger', '')
    this.route.queryParams
      .subscribe((params: Params) => {
        if(params['nowCanLogin']){
          this.showMessage({
            text: 'Now u can login!',
            type: 'success'});
        }
      });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() =>{
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            this.message.text = '1';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage({
              text: 'Wrong password!',
              type: 'danger'
              });
          }
        } else {
          this.showMessage({
            text: 'Error!',
            type: 'danger'});
        }
      });
  }
}
