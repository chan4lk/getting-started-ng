import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { CardEffects } from './effects/cards';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CardComponent } from './card/card.component';
import { CardListComponent } from './card-list/card-list.component';
import { NewCardInputComponent } from './new-card-input/new-card-input.component';
import { CardService } from './card.service';
import { AngularFireAuthModule } from 'angularfire2/auth';

const routes: Routes = [
  {path: '', redirectTo: 'cards', pathMatch: 'full'},
  {path: 'cards', component: MainComponent}
];

@NgModule({
  declarations: [
    CardComponent,
    CardListComponent,
    NewCardInputComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('cards', reducers),
    EffectsModule.forFeature([CardEffects]),
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    CardService
  ]
})
export class CardsModule { }
