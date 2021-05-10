import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { ComService } from '../../services/com.service';
import { ProjectsService } from '../../services/projects.service';
import { combineLatest } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { ProjectListItem } from '../../models/project-list-item';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  public projects: ProjectListItem[] = [];
  public userName: string = '';

  constructor(
    private projectsService: ProjectsService,
    private authService: AuthenticationService,
    private comService: ComService
  ) { }

  public ngOnInit(): void {
    this.userName = this.authService.userValue.username;
    this.comService.reloadProjects$.pipe(
      switchMap(() => {
        return combineLatest([
          this.projectsService.getProjectsList(this.userName),
          this.comService.processedProjects$
        ])
      })
    ).subscribe(([projects, currentlyProcessd]) => {
      this.projects = this.addCurrentlyProcessing(projects, currentlyProcessd);
    });
  }

  private addCurrentlyProcessing(projects: ProjectListItem[], currentlyProcessd: ProjectListItem[]): ProjectListItem[] {
    const readyProjects = projects.filter((project) => !project.processing);
    readyProjects.push(...currentlyProcessd);

    return readyProjects;
  }  
}

