import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.css']
})
export class SaveUserComponent implements OnInit {
  @ViewChild('userForm') userForm!: NgForm;
  currentSymbols = 300;
  maxSymbols = 300;

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(description: NgModel) {
    if (this.userForm.valid) {
      const user = new User(
        'id',
        this.userForm.value.name,
        this.userForm.value.surname,
        this.userForm.value.patronymic,
        this.userForm.value.phoneNumber,
        this.userForm.value.placeOfWorkStudy,
        this.userForm.value.TShirt,
        this.userForm.value.size,
        this.userForm.value.description);
      this.userService.createUser(user);
    }
  }

  getSymbolsCount(symbols: number) {
    this.currentSymbols = this.maxSymbols - symbols;
  }
}
