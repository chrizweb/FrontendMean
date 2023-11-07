import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { NgForm } from "@angular/forms";
import { User } from "../../models/user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  formUser: User = {
    name:'',
    user:'',
    email:'',
    password:'',
    telephone:''
  }

  users: User[]=[]

  constructor(public userService:UserService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.userService.gets().subscribe({
      next:(data) =>{
        this.users = data
      }, error:(e) =>{
        console.log(e)
      }
    })
    }
  

  editUser(user: User){
    this.formUser = user
  }

  addUser(form: NgForm){
    if(form.value._id){
      this.userService.update(form.value).subscribe({
        next:(data) =>{
          this.getUsers()
          form.reset()
        }, error:(e) =>{
          console.log(e)
        }
      })
    }else{
      this.userService.add(form.value).subscribe({
        next:(data) =>{
          this.getUsers()
          form.reset()
        }
      })
    }
  }

  deleteUser(id:any){
    if(confirm('Desea eliminar usuario')){
      this.userService.delete(id).subscribe({
        next:(res) =>{
          alert('Usuario eliminado con exito')
          this.getUsers()
        }
        
      })
    }
  }

}
