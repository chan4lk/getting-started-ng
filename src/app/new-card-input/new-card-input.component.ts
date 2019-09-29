import {
  Component,
  OnInit,
  HostBinding,
  Output,
  EventEmitter,
  HostListener,
  OnDestroy
} from '@angular/core';
import { takeWhile, debounceTime, filter } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Card } from '../model/card';
@Component({
  selector: 'app-new-card-input',
  templateUrl: './new-card-input.component.html',
  styleUrls: ['./new-card-input.component.scss']
})
export class NewCardInputComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'col-4';

  @Output() cardAdd = new EventEmitter<Card>();

  newCardForm: FormGroup;
  alive = true;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === 'Enter' && this.newCardForm.valid) {
      this.addCard(this.newCardForm.controls.text.value);
    }
  }

  addCard(text: any) {
    this.cardAdd.emit(new Card(text));
    this.newCardForm.controls.text.setValue('');
  }

  constructor(fb: FormBuilder) {
    this.newCardForm = fb.group({
      text: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ]
    });
    this.newCardForm.valueChanges.pipe(
      filter((value) => this.newCardForm.valid),
      debounceTime(500),
      takeWhile(() => this.alive)
    ).subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.alive = false;
  }
}
