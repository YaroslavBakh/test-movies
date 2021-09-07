import { Component, OnInit } from '@angular/core';
import { CsvcallsService } from '../csvcalls.service'
import { movieInterface } from '../interfaces/movieInterface'
@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit {
  moviesCount:number = 10;
  constructor(private scv:CsvcallsService) { }
  movies?:Array<movieInterface>
  pages:Array<number> = [];
  filtered:boolean = false;
  filter:string = '';
  filterCondition:string = 'down';
  genres:Array<string> = ['new','comedy','drama','history'];
  activeGenre:string = '';
  createMovieList(page:number){
    this.scv.getMovies(this.moviesCount,page).subscribe(data =>{
      this.movies = data.movies;
      this.createPages(data.pages)
    })
  }
  createMovieListByYear(page:number){
    this.scv.getMoviesSortedByYear(this.moviesCount,page,this.filterCondition).subscribe(data =>{
      this.movies = data.movies;
      this.createPages(data.pages)
      })
  }
  createMovieListByGenre(page:number,genre:string){
    this.scv.getMoviesSortedByGenre(this.moviesCount,page,genre).subscribe(data =>{
      this.movies = data.movies;
      this.createPages(data.pages)
      })
  }

  createPages(data:number){
    this.pages.length = 0;
    for (let i = 0;i<data;i++){
      this.pages.push(i+1)
    }
  }

  anotherPage(page:number){
    this.pages.length = 0;
    if (!this.filtered) {
      this.createMovieList(page)
    } else {
      if(this.filter === 'year'){
        this.createMovieListByYear(page)
      } else {
        this.createMovieListByGenre(page,this.activeGenre)
      }
    }
    
  }

  createFilteredMovieList(filter?:any){
    if(this.filterCondition === 'down'){
      this.filterCondition = 'up';
    }else {
      this.filterCondition = 'down';
    }
    this.filtered = true;
    this.filter = filter;
    if(filter === 'year'){
     this.createMovieListByYear(1)
    }else {
      this.createMovieListByGenre(1,this.activeGenre)
    }
  }

  changeGenre(event:any){
    if(event.target.value){
    this.filtered = true;
    this.activeGenre = event.target.value
    this.createFilteredMovieList()
    }
    
  }
  ngOnInit(): void {
    this.createMovieList(1)
  }

}
