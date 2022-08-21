import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment";

const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private http: HttpClient){}

    saveUser(registerData: any): Observable<any> {
        return this.http.post<any>(ROOT_PATH + '/register', registerData).pipe(
            catchError(err => {
                return throwError(err)
            })
        )
    }
}