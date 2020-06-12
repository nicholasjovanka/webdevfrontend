import { NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSliderModule} from '@angular/material/slider';
const MaterialComponents = [
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatFormFieldModule,
  MatInputModule, MatMenuModule, MatExpansionModule, MatCardModule, MatPasswordStrengthModule
  , MatProgressSpinnerModule,  MatAutocompleteModule, MatTableModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule,
  MatSnackBarModule, MatDialogModule, MatTabsModule, MatSliderModule
];

@NgModule({
  imports : [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
