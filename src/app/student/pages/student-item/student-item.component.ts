import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/shared/interfaces/student.interface';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-student-item',
  templateUrl: './student-item.component.html',
  styleUrls: ['./student-item.component.css']
})
export class StudentItemComponent implements OnInit {
  id: number | null = null;

  student!: Student;

  studentForm!: FormGroup;

  constructor(private studentservice: StudentService, private fb: FormBuilder, private router:Router, private activatedRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRout.params.subscribe(params => {
      this.id = params.id ? +params.id : null;
      this.getData();
    })
  }

  async getData(){
    
      const controls ={
        name: [null,[Validators.required]],
        surname: [null,[Validators.required]],
        patronymic: [null],
        birthday: [null, [Validators.required]],
        group: [null,[Validators.required]],
        phone: [null,[Validators.required]],
        email: [null,[Validators.required]],
        direction: [null,[Validators.required]],
      }

      this.studentForm = this.fb.group(controls);

      if(this.id){
        try {
          this.student = await this.studentservice.getStudent(this.id);
        } catch (error) {
          console.log(error);
          return;
        }
        this.studentForm.patchValue(this.student);
      }else{
        this.studentForm.reset();
      }
  }

  async save() {
    if(this.id){
      const student = this.studentForm.value;
      try {
        await this.studentservice.putStudent(this.id ,student);
        this.getData();
      } catch (error) {
        console.log(error);
      }
    }else{
    const student = this.studentForm.value;
    try {
      const result = await this.studentservice.postStudent(student);
      this.router.navigate([this.router.url, result.id]);
    } catch (error) {
      console.log(error);
    }
  }
  }
  async delete(){
    try {
      if(this.id){
      await this.studentservice.deleteStudent(this.id);
      }
      this.router.navigate(['student']);
    } catch (error) {
      
    }
  }


}
