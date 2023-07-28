import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { appRoutes } from './app.routes';
import { HomePageComponent } from './home-page/home-page.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {
    path: '/:id',
    component: HomePageComponent
  },
]

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, HomePageComponent],
  imports: [
    BrowserModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MessagesModule,
    ToastModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
