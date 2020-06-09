import { Injectable } from '@angular/core';
import { IEmployee } from './IEmployee';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';





@Injectable()
export class EmployeeService {
  baseUrl = 'http://localhost:3000/employees';

  constructor(private HttpClient: HttpClient) { }

  private listEmployee: IEmployee[];
  getEmployees(): Observable<IEmployee[]> {
    return this.HttpClient.get<IEmployee[]>(`${this.baseUrl}`).pipe(catchError(this.handleError));
  }

  private handleError(errorResponce: HttpErrorResponse) {
    if (errorResponce.error instanceof ErrorEvent) {
      console.error('client side error: ', errorResponce.error.message);
    } else {
      console.error('server side error: ', errorResponce);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  addEmployee(employee: IEmployee):Observable<IEmployee>{
    // this.listEmployee.push(employee);
    return this.HttpClient.post<IEmployee>(`${this.baseUrl}`,employee,{
      headers:new HttpHeaders({
        'Content-type':'application/json'
      })
    })
    .pipe(catchError(this.handleError));
  }

  getEmployee(id: number): Observable<IEmployee>{
    // return this.listEmployee.find(e => e.id === id);
    return this.HttpClient.get<IEmployee>(`${this.baseUrl}/${id}`)
    .pipe(catchError(this.handleError));
  }

  updateEmployee(employee:IEmployee):Observable<void>{
    return this.HttpClient.put<void>(`${this.baseUrl}/${employee.id}`,employee,{
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));

  }

  deleteEmployee(id: number):Observable<void> {
   return this.HttpClient.delete<void>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }
}
