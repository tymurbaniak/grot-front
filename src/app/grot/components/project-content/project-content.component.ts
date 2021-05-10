import { Component, Input, OnInit } from '@angular/core';
import { ProjectInfo, ProjectInfoExtended } from '../../models/project-info';
import { ProjectsService } from '../../services/projects.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-project-content',
  templateUrl: './project-content.component.html',
  styleUrls: ['./project-content.component.scss']
})
export class ProjectContentComponent {

  public isProjectLoaded = false;
  public project: ProjectInfoExtended = new ProjectInfoExtended();

  @Input() projectName: string = '';
  @Input() userName: string = '';
  @Input() processing: boolean | undefined;

  constructor(
    private projectsService: ProjectsService
  ) { }

  public loadProject(): void {
    this.projectsService.getProjectData(this.projectName, this.userName).subscribe((project: ProjectInfo) => {
      this.rewriteImageUrls(project);
      this.project = project;
      this.isProjectLoaded = true;
    });
  }

  private rewriteImageUrls(project: ProjectInfo) {
    const updatedUrls: string[] = [];
    if (project.outputImageUrls) {
      project.outputImageUrls.forEach((imageUrl: string) => {
        if (!imageUrl.includes(environment.apiUrl)) {
          updatedUrls.push(`${environment.apiUrl}/${imageUrl}`);
        }
      });
      project.outputImageUrls = updatedUrls;
    }
  }

}
