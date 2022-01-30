import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibroFormComponent } from './components/libro-form/libro-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ListLibrosComponent } from './components/list-libros/list-libros.component';
import { RouterModule } from '@angular/router';
import { EditLibroComponent } from './components/dialogs/edit-libro/edit-libro.component';
import { DeleteLibroComponent } from './components/dialogs/delete-libro/delete-libro.component';


@NgModule({
  declarations: [
    AppComponent,
    LibroFormComponent,
    FooterComponent,
    ListLibrosComponent,
    EditLibroComponent,
    DeleteLibroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: LibroFormComponent },
      { path: 'libros', component: ListLibrosComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
