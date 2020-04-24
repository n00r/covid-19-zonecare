import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Count } from '../app/models/count';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  // API path
  world_count = 'https://corona.lmao.ninja/v2/all';
  india_count = 'https://api.covid19india.org/data.json';
  ward_list = '../assets/data/wardlist.json';     // comments this line 
  // ward_list = ' http://localhost:8080/api/wards'; // un-comments this line for prod
  ward_details = '../assets/data/warddetails.json';
  moreservice_list = '../assets/data/moreservices.json';
 
  constructor(private http: HttpClient) { }
 
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
 
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

 
  // Get Counts data
  worldcount(): Observable<any> {
    return this.http
      .get<any>(this.world_count)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  };
  indiacount(): Observable<any> {
    return this.http
      .get<any>(this.india_count)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  };
  getWardList(val): Observable<any> {
    return this.http
      .get<any>(this.ward_list+'?pincode_ward='+val)   // comments this line 
      // .get<any>(this.ward_list+'/'+val) // un-comments this line for prod
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  };
  getWardDetails(val): Observable<any> {
    return this.http
      .get<any>(this.ward_details+'?pincode_ward='+val)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  };
  moreServiceLists(val): Observable<any> {
    return this.http
      .get<any>(this.moreservice_list+'?pincode_ward='+val)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  };
 
 
}