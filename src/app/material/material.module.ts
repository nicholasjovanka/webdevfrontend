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
const MaterialComponents = [
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatFormFieldModule,
  MatInputModule, MatMenuModule, MatExpansionModule, MatCardModule, MatPasswordStrengthModule
  , MatProgressSpinnerModule
];

@NgModule({
  imports : [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
