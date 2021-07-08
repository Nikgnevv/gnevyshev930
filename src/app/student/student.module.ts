import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentItemComponent } from './pages/student-item/student-item.component';
import { StudentLayoutComponent } from './shared/components/student-layout/student-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StudentListComponent,
    StudentItemComponent,
    StudentLayoutComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    StudentRoutingModule,
    FormsModule
  ]
})
export class StudentModule { }
