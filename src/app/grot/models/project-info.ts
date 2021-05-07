import { ParameterValue } from "./parameter-value";

export class ProjectInfo {
  public outputImageUrls: string[] = [];
  public name: string = '';
  public inputImageUrl: string = '';
  public parameters: ParameterValue[] = [];
}

export class ProjectInfoExtended extends ProjectInfo {
  public processing: boolean = false;
}
