import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.css']
})
export class SaveUserComponent implements OnInit {
  @ViewChild('userForm') userForm!: NgForm;
  currentSymbols = 300;
  maxSymbols = 300;
  isEdit = false;
  userId = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const user = <User | null>data.user;

      if (user) {
        this.isEdit = true;
        this.userId = user.id;
        this.setFormValues({
          name: user.name,
          surname: user.surname,
          patronymic: user.patronymic,
          phoneNumber: user.phoneNumber,
          placeOfWorkStudy: user.placeOfWorkStudy,
          TShirt: user.TShirt,
          size: user.size,
          description: user.description,
        });
      } else {
        this.isEdit = false;
        this.userId = '';
        this.setFormValues({
          name: '',
          surname: '',
          patronymic: '',
          phoneNumber: '',
          placeOfWorkStudy: '',
          TShirt: '',
          size: '',
          description: '',
        });
      }
    });
  }

  setFormValues(value: { [keys: string]: string | number }) {
    setTimeout(() => {
      this.userForm.form.setValue(value);
    });
  }

  onSave() {
    const user = new User(
      this.userId,
      this.userForm.value.name,
      this.userForm.value.surname,
      this.userForm.value.patronymic,
      this.userForm.value.phoneNumber,
      this.userForm.value.placeOfWorkStudy,
      this.userForm.value.TShirt,
      this.userForm.value.size,
      this.userForm.value.description);

    const next = () => {
      this.userService.fetchUsersData();
    };

    if (this.isEdit && this.userForm.valid) {
      this.userService.editUser(user).subscribe(next);
    } else if (!this.isEdit && this.userForm.valid) {
      this.userService.createUser(user).subscribe(next);
    }
  }

  getSymbolsCount(symbols: number) {
    this.currentSymbols = this.maxSymbols - symbols;
  }
}
