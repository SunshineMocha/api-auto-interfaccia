import { NgModule } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostDealerComponent } from './components/post-dealer/post-dealer.component';
import { PostCarComponent } from './components/post-car/post-car.component';
import { PutDealerDialogComponent } from './components/put-dealer-dialog/put-dealer-dialog.component';
import { PutCarDialogComponent } from './components/put-car-dialog/put-car-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { NewHomeComponent } from './components/new-home/new-home.component';

@NgModule({
  declarations: [
    AppComponent,
    NewHomeComponent
  ],
  imports: [
    BrowserModule,
    NgFor,
    NgIf,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    PostDealerComponent,
    PostCarComponent,
    PutDealerDialogComponent,
    PutCarDialogComponent,
    DeleteDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
