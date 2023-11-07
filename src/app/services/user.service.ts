import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  url = 'http://localhost:3000/api/users'


  gets(){
    return this.http.get<User[]>(this.url)
  }

  add(user: User){
    return this.http.post(this.url, user)
  } 

  update(user: User){
    return this.http.put(`${this.url}/${user._id}`, user)
  }

  delete(id: string){
    return this.http.delete(`${this.url}/${id}`)
  }
}
