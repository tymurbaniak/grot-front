import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projectsSubject: BehaviorSubject<any>;

  constructor(
    private http: HttpClient
  ) {
    this.projectsSubject = new BehaviorSubject<any>({});
   }

  public getProjectsList(userName: string) {
    return this.http.post<any>(`${environment.apiUrl}/grot/projectslist`, { userName: userName }, { withCredentials: true })
      .pipe(map((projects: any) => {
        this.projectsSubject.next(projects);
        return projects;
      }));
  }
}
