import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ParameterValue } from '../models/parameter-value';
import { ProjectInfo, ProjectInfoExtended } from '../models/project-info';

@Injectable({
  providedIn: 'root'
})
export class ComService {

  private parametersSource = new BehaviorSubject<ParameterValue[]>([]);
  private reloadProjectsSource = new BehaviorSubject<boolean>(false);
  private processedProjectsSource = new BehaviorSubject<ProjectInfoExtended[]>([]);

  parameters$ = this.parametersSource.asObservable();
  reloadProjects$ = this.reloadProjectsSource.asObservable();
  processedProjects$ = this.processedProjectsSource.asObservable();

  constructor() { }

  public setParameters(parameters: ParameterValue[]) {
    this.parametersSource.next(parameters);
  }

  public setReloadProjects() {
    this.reloadProjectsSource.next(true);
  }

  public addProcessedProject(processId: string) {
    const processed = this.processedProjectsSource.value;
    const processedProject = new ProjectInfoExtended();
    processedProject.name = processId;
    processedProject.processing = true;
    processed.push(processedProject);
    this.processedProjectsSource.next(processed);
  }

  public removeProcessedProject() {
    const processed = this.processedProjectsSource.value;
    processed.pop();
    this.processedProjectsSource.next(processed);
  }
}
