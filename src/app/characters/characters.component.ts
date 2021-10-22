import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from '../services/characters.service';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: []
})
export class CharactersComponent implements OnInit, AfterViewInit  {
  characters!: any[]; 
  displayedColumns = ['image', 'name', 'species', 'gender', 'house', 'dateOfBirth', 'alive'];
  dataSource!: any;// = new MatTableDataSource(this.showCharacters); 

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private charactersService: CharactersService,
    private liveAnnouncer: LiveAnnouncer,
    private route: ActivatedRoute
  ) { }  

  ngOnInit(): void {    
    this.getCharacters();
    console.log(this.characters);       
  }
 
  ngAfterViewInit(): void {
    //this.dataSource.sort = this.sort;
    console.log(this.dataSource); 
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
     if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  getCharacters() :void { 
    const house = this.route.snapshot.paramMap.get('house')!;
    const type = this.route.snapshot.paramMap.get('type')!;

    //Dependiendo de la ruta llama un servico
    if(type=="all"){
      if(house=="all"){
        this.charactersService.getAll()
        .subscribe((data :any) =>
        { 
          this.characters = data;       
          this.updateDataSource(this.characters);      
         });
      }else{
        this.charactersService.getByHouse(house)
        .subscribe((data :any) =>
        { 
          this.characters = data;       
          this.updateDataSource(this.characters);      
         });
      }
    }else{
      if(type=="staff"){
        this.charactersService.getStaff()
        .subscribe((data :any) =>
        { 
          this.characters = data;       
          this.updateDataSource(this.characters);      
        });
      }else{
        this.charactersService.getStudentes()
        .subscribe((data :any) =>
        { 
          this.characters = data;       
          this.updateDataSource(this.characters);      
        });
      }
    }
    
   
         
  }

  searchFieldChange(event: any) :void{
    let searchText = event.target.value;
    if(searchText == ""){
      this.updateDataSource(this.characters);
    }else{
      let showCharacters = this.characters.filter(character => character.name.toLowerCase().includes(searchText.toLowerCase()));      
      this.updateDataSource(showCharacters);      
    }
    
  }

  updateDataSource(data: any[]) :void{
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;   
  }

}
