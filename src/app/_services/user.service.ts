import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//import { environment } from '@environments/environment';
import { User } from './_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    url = 'https://localhost:44319';

    getAll() {
        return this.http.get<User[]>(`${turl}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${url}/users/${id}`);
    }

    login
}