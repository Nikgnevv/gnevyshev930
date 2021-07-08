import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/shared/interfaces/student.interface';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students!: Student[];

  group: string = '';
  surname: string = '';
  direction: string = '';

  constructor(private studentService: StudentService, private router:Router) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData(){
    try {
      this.students = (await this.studentService.getStudents()) || [];
      this.students.sort((a, b) => { return a.surname < b.surname ? -1 : 1 })
      this.group = '';
      this.surname = '';
      this.direction = '';
    } catch (error) {
      console.log(error);
    }
  }

  LinkToItem(id?: number){
    if(id){
      this.router.navigate([this.router.url, 'item', id])
    }else{
      this.router.navigate([this.router.url, 'item'])
    }
  }

 async filter(){
    this.students = (await this.studentService.getStudents()) || [];
    console.log(this.group)
    if (this.group != ''){
     this.students = this.students.filter(elem => elem.group.toLocaleLowerCase().includes(this.group.toLocaleLowerCase()));
     this.students.sort((a, b) => { return a.surname < b.surname ? -1 : 1 })
     console.log(this.students);
    }
    else{
      
    }
    if (this.surname != ''){
     this.students = this.students.filter(elem => elem.surname.toLocaleLowerCase().includes(this.surname.toLocaleLowerCase()));
     this.students.sort((a, b) => { return a.surname < b.surname ? -1 : 1 })
     console.log(this.students);
    }
    else{
      
    }
    if (this.direction != ''){
     this.students = this.students.filter(elem => elem.direction.toLocaleLowerCase().includes(this.direction.toLocaleLowerCase()));
     this.students.sort((a, b) => { return a.surname < b.surname ? -1 : 1 })
     console.log(this.students);
    }
    else{
      
    }
    this.students.sort((a, b) => { return a.surname < b.surname ? -1 : 1 })
  }


}
