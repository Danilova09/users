import { Component } from '@angular/core';

@Component({
  selector: 'app-registered',
  template: `
    <div class="alert alert-success">
      You have successfully registered!
    </div>`,
  styles: [`
    .alert {
      display: block;
      width: 800px;
      margin: 70px auto;
    }
  `]
})
export class RegisteredComponent {}
