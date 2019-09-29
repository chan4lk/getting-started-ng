import {
  Component,
  OnInit,
  HostBinding,
  Output,
  EventEmitter,
  HostListener,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-new-card-input',
  templateUrl: './new-card-input.component.html',
  styleUrls: ['./new-card-input.component.scss']
})
export class NewCardInputComponent implements OnInit {
  @HostBinding('class') classes = 'col-4';

  public newCard: any = { text: '' };

  @Output() cardAdd = new EventEmitter<string>();

  newCardForm: FormGroup;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === 'Enter' && this.newCardForm.valid) {
      this.addCard(this.newCardForm.controls.text.value);
    }
  }

  addCard(text: any) {
    this.cardAdd.emit(text);
    this.newCardForm.controls.text.setValue('');
  }

  constructor(fb: FormBuilder) {
    this.newCardForm = fb.group({
      text: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ]
    });
  }

  ngOnInit() {}
}
