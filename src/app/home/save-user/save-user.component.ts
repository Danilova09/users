import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.css']
})
export class SaveUserComponent implements OnInit {
  @ViewChild('userForm') userForm!: NgForm;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.userForm);
  }
}
