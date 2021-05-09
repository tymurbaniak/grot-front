import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { ComService } from '../../services/com.service';
import { ProjectsService } from '../../services/projects.service';
import { combineLatest } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ProjectInfo, ProjectInfoExtended } from '../../models/project-info';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  public projects: any[] = [];

  constructor(
    private projectsService: ProjectsService,
    private authService: AuthenticationService,
    private comService: ComService,
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    const userName = this.authService.userValue.username;
    this.comService.reloadProjects$.pipe(
      switchMap(() => {
        return combineLatest([
          this.projectsService.getProjectsList(userName),
          this.comService.processedProjects$
        ])
      })
    ).subscribe(([projects, currentlyProcessd]) => {
      this.rewriteImageUrls(projects);
      this.projects = this.addCurrentlyProcessing(projects, currentlyProcessd);
      this.changeDetector.detectChanges();
    });
  }

  private addCurrentlyProcessing(projects: ProjectInfoExtended[], currentlyProcessd: ProjectInfoExtended[]): ProjectInfoExtended[] {
    const readyProjects = projects.filter((project) => !project.processing);
    readyProjects.push(...currentlyProcessd);

    return readyProjects;
  }

  private rewriteImageUrls(projects: ProjectInfo[]) {
    projects.forEach((project: ProjectInfo) => {
      const updatedUrls: string[] = [];
      if (project.outputImageUrls) {
        project.outputImageUrls.forEach((imageUrl: string) => {
          if (!imageUrl.includes(environment.apiUrl)) {
            updatedUrls.push(`${environment.apiUrl}/${imageUrl}`);
          }
        });
        project.outputImageUrls = updatedUrls;
      }
    });
  }
}

