import { Component, OnInit, HostBinding, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-new-card-input',
  templateUrl: './new-card-input.component.html',
  styleUrls: ['./new-card-input.component.scss']
})
export class NewCardInputComponent implements OnInit {
  @HostBinding('class') classes = 'col-4';

  public newCard: any = {text: ''};

  @Output() cardAdd = new EventEmitter<string>();

  @ViewChild('form', {static: true}) public form: NgForm;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === 'Enter' && this.form.valid) {
      this.addCard(this.newCard.text);
    }
  }

  addCard(text: any) {
    this.cardAdd.emit(text);
    this.newCard.text = '';
  }

  constructor() { }

  ngOnInit() {
  }

}
