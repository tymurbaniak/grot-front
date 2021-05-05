import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ParameterValue } from '../models/parameter-value';

@Injectable({
  providedIn: 'root'
})
export class ComService {

  private parametersSource = new BehaviorSubject<ParameterValue[]>([]);
  private reloadProjectsSource = new BehaviorSubject<boolean>(false);

  parameters$ = this.parametersSource.asObservable();
  projects$ = this.reloadProjectsSource.asObservable();

  constructor() { }

  public setParameters(parameters: ParameterValue[]){
    this.parametersSource.next(parameters);
  }

  public setReloadProjects(){
    this.reloadProjectsSource.next(true);
  }
}
