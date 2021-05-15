import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ParameterValue } from '../models/parameter-value';
import { ProjectInfo, ProjectInfoExtended } from '../models/project-info';
import { ProcessValidator } from './process-validator';

@Injectable({
  providedIn: 'root'
})
export class ComService {

  private parametersSource = new BehaviorSubject<ParameterValue[]>([]);
  private reloadProjectsSource = new BehaviorSubject<boolean>(false);
  private processedProjectsSource = new BehaviorSubject<ProjectInfoExtended[]>([]);
  private areParametersValidSource = new BehaviorSubject<boolean>(false);
  private processDataInvalidSource = new Subject<ProcessValidator>();

  parameters$ = this.parametersSource.asObservable();
  reloadProjects$ = this.reloadProjectsSource.asObservable();
  processedProjects$ = this.processedProjectsSource.asObservable();
  areParametersValid$ = this.areParametersValidSource.asObservable();
  processDataInvalid$ = this.processDataInvalidSource.asObservable();

  constructor() { }

  public setProcessDataInvalid(validator: ProcessValidator){
    this.processDataInvalidSource.next(validator);
  }

  public areParametersValid(): boolean {
    return this.areParametersValidSource.value;
  }

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

  public setAreParametersValid(areValid: boolean) {
    this.areParametersValidSource.next(areValid);
  }
}
