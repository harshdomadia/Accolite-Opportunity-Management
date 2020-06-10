import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MaterialModuleModule } from './material-module/material-module.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { RouterModule} from '@angular/router';
import { MatDialogModule} from '@angular/material/dialog';
import { MatTableModule} from '@angular/material/table';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TrendsComponent } from './trends/trends.component';
//import { StorageServiceModule} from 'angular-webstorage-service';
import { ChartsModule } from 'ng2-charts';
import {MatSelectModule} from '@angular/material/select';
import{ MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {UserServiceService} from './user-service.service';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    DialogBoxComponent,
    TrendsComponent,
    

  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      {path: 'trends', component: TrendsComponent},
      { path: '', component: LoginComponent }
   ]),
   MatDialogModule,
   MatDialogModule,
   HttpClientModule,
   MatSortModule,
   MatPaginatorModule,
   ChartsModule,
   MatSelectModule,
   MatDatepickerModule ,
   MatNativeDateModule,
   MatMenuModule

   

    
    
  ],
  exports: [MatToolbarModule,MatMenuModule,MatAutocompleteModule,MatSortModule,MatDatepickerModule ,
    MatNativeDateModule],
  entryComponents: [
    DialogBoxComponent
  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
