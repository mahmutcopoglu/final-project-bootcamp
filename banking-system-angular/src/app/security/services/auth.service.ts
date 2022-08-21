import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment";
import { CookieService } from "ngx-cookie-service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
import { ProfileService } from "src/app/pages/profile/services/profile.service";

const ROOT_PATH = environment.requestRoot;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userRoles: any = []
    constructor(private http: HttpClient,
        private cookieService: CookieService,
        private profileService: ProfileService,
        private router: Router){
            
        }

    storeToken(token:string){
    
        this.cookieService.set('token',token);
        localStorage.setItem('token',token);
    }

    setUsername(username: string){
        localStorage.setItem('username',username)
    }

    removeToken(){
        this.cookieService.delete('token');
        localStorage.removeItem('token');
    }

    getToken(){
        return this.cookieService.get('token');
    }

    isLoggedIn(){
        return !!this.getToken();
    }


    doLogout(){
        this.userRoles = []
        this.removeToken();
        this.router.navigate(['login']);
        
    }

    hasPermission(roleName: string): Promise<boolean> {
		return this.loadPermissions().then((rp: any) => {
			return (
				this.userRoles.includes(roleName)
			);
		});
	}

    loadPermissions(): Promise<string[]> {
		if (this.userRoles.length==0) {
			return this.http
				.get(
					ROOT_PATH + '/user'
				)
				.toPromise()
				.then((rp: any) => {
					this.userRoles = rp.authorities;
					return this.userRoles;
				});
		} else {
			return Promise.resolve(this.userRoles);
		}
	}


}