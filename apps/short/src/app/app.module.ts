import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { appRoutes } from './app.routes';
import { HomePageComponent } from './home-page/home-page.component';
import { NxWelcomeComponent } from './nx-welcome.component';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';

const routes: Routes = [
  {path: '', component: HomePageComponent},
]

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, HomePageComponent],
  imports: [
    BrowserModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ReactiveFormsModule,
    AccordionModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
