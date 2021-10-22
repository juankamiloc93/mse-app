import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(){
    return this.http.get("http://hp-api.herokuapp.com/api/characters");
  }

  getStudentes(){
    return this.http.get("http://hp-api.herokuapp.com/api/characters/students");
  }

  getStaff(){
    return this.http.get("http://hp-api.herokuapp.com/api/characters/staff");
  }

  getByHouse(house: string){
    return(this.http.get(`http://hp-api.herokuapp.com/api/characters/house/${house}`))
  }
}
