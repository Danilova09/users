import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { max } from 'rxjs/operators';

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.css']
})
export class SaveUserComponent implements OnInit {
  @ViewChild('userForm') userForm!: NgForm;
  currentSymbols = 300;
  maxSymbols = 300;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(description: NgModel) {
    console.log(description.value);
  }

  getSymbolsCount(symbols: number) {
    this.currentSymbols = this.maxSymbols - symbols;
  }
}
