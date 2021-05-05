import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { ComService } from '../../services/com.service';
import { ProjectsService } from '../../services/projects.service';

import { environment } from '../../../../environments/environment';

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
    this.comService.projects$.subscribe(() => {
      this.getProjects();
    });
  }

  private getProjects(): void {
    const userName = this.authService.userValue.username;
    this.projectsService.getProjectsList(userName).subscribe(projects => {
      projects.forEach((project: any) => {
        const updatedUrls: string[] = [];
        project.outputImageUrls.forEach((image: string) => {
          updatedUrls.push(`${environment.apiUrl}/${image}`);
        });
        project.outputImageUrls = updatedUrls;
      });

      this.projects = projects;
      this.changeDetector.detectChanges();
    });
  }



}
