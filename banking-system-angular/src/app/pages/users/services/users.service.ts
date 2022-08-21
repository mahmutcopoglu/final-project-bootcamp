import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment";

const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private http: HttpClient){}

    getUsers(): Observable<any> {
        return this.http.get<any>(ROOT_PATH + '/users').pipe(
            catchError(err => {
                return throwError(err)
            })
        )
    }

    getUserDetailById(id: any): Observable<any> {
        return this.http.get<any>(ROOT_PATH + `/user/${id}`).pipe(
            catchError(err => {
                return throwError(err)
            })
        )
    }

    getAccountByUserId(id: any): Observable<any> {
        return this.http.get<any>(ROOT_PATH + `/accounts/user/${id}`).pipe(
            catchError(err => {
                return throwError(err)
            })
        )
    }

    changeEnabledUser(id: any, data:any): Observable<any> {
        return this.http.post<any>(ROOT_PATH + `/users/${id}`,data).pipe(
            catchError(err => {
                return throwError(err)
            })
        )
    }



    

}