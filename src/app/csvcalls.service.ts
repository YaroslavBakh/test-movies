import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders,HttpParams} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import { movieInterface } from './interfaces/movieInterface'
@Injectable({
  providedIn: 'root'
})
export class CsvcallsService {

  constructor(private httpClient:HttpClient) { }


  getMovies(moviesCount:number,pageNumber:number):Observable<any>{
    return this.httpClient.get(`http://localhost:3000/movies/${moviesCount}/${pageNumber-1}`)
  }
  getMoviesSortedByYear(moviesCount:number,pageNumber:number,filter:string):Observable<any>{
    return this.httpClient.get(`http://localhost:3000/movies/byYear/${filter}/${moviesCount}/${pageNumber-1}`)
  }
  getMoviesSortedByGenre(moviesCount:number,pageNumber:number,filter:string):Observable<any>{
    return this.httpClient.get(`http://localhost:3000/movies/byGenre/${filter}/${moviesCount}/${pageNumber-1}`)
  }
}
