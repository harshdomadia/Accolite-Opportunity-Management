import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import {MatSelectModule} from '@angular/material/select';
// import {MatRadioModule} from '@angular/material/radio'
// import {MatCheckboxModule} from '@angular/material/checkbox'
// import {MatSnackBarModule} from '@angular/material/snack-bar'


@NgModule({
  imports: [
  CommonModule, 
  MatToolbarModule,
  MatButtonModule, 
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule,
  // MatSelectModule,
  // MatRadioModule,
  // MatCheckboxModule,
  // MatSnackBarModule
  ],
  exports: [
  CommonModule,
   MatToolbarModule, 
   MatButtonModule, 
   MatCardModule, 
   MatInputModule, 
   MatDialogModule, 
   MatTableModule, 
   MatMenuModule,
   MatIconModule,
   MatProgressSpinnerModule,
   MatAutocompleteModule,
  //  MatSelectModule,
  //   MatRadioModule,
  //   MatCheckboxModule,
  //   MatSnackBarModule
   ],
})
export class MaterialModuleModule { }
