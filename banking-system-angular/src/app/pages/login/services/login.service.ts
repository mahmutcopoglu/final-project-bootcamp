import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment";

const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient){}

    loginUser(loginData: any): Observable<any> {
        return this.http.post<any>(ROOT_PATH + '/login', loginData).pipe(
            catchError(err => {
                return throwError(err)
            })
        )
    }

    
}