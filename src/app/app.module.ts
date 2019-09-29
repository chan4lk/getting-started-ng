import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CardListComponent } from './card-list/card-list.component';
import { NewCardInputComponent } from './new-card-input/new-card-input.component';
import { CardService as CardService } from './card.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { CardEffects } from './effects/cards';
import { Routes, RouterModule, Router } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: '', redirectTo: 'cards', pathMatch: 'full'},
  {path: 'cards', component: MainComponent},
  {path: 'about', component: AboutComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardListComponent,
    NewCardInputComponent,
    AboutComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([CardEffects]),
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
