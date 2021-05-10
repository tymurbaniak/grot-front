import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ProjectInfo } from '../models/project-info';
import { ProjectListItem } from '../models/project-list-item';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projectsSubject: BehaviorSubject<ProjectListItem[]> = new BehaviorSubject<ProjectListItem[]>([]);
  private projectSubject: Subject<ProjectInfo> = new Subject<ProjectInfo>();

  constructor(
    private http: HttpClient
  ) {
  }

  public getProjectsList(userName: string) {
    return this.http.post<any>(`${environment.apiUrl}/grot/projects`, { userName: userName }, { withCredentials: true })
      .pipe(map((projects: ProjectListItem[]) => {
        this.projectsSubject.next(projects);
        return projects;
      }));
  }

  public getProjectData(projectName: string, userName: string) {
    return this.http.post<any>(`${environment.apiUrl}/grot/project`, { userName: userName, projectName: projectName }, { withCredentials: true })
      .pipe(map((project: ProjectInfo) => {
        this.projectSubject.next(project);
        return project;
      }));
  }
}
