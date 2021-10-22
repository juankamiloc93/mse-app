import { Component, OnInit } from '@angular/core';

import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: []
})
export class HousesComponent implements OnInit {
  houses!: any[];
  
  constructor(
    private charactersService: CharactersService
  ) { }

  ngOnInit(): void {
    this.getHouses();   
    console.log(this.houses);   
  }

  getHouses() :void{
    let houses: any[] = [];
    this.charactersService.getAll()
      .subscribe((data:any)=> {       
        data.forEach((character:any) => {
          let houseName = character.house;
          if(houseName != ""){            
            houses[houseName] = houses[houseName]? {count: houses[houseName].count + 1, name: houseName} : {count: 1, name: houseName};                      
          }               
        });
        this.houses = Object.values(houses);       
    });   
  }  

}
