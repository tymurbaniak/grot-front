import { Password } from "primeng/password";

export class ProcessValidator {
  public isDataValid: boolean = true;
  public validationMessages: string[] = [];

  public isImageOk(isOk: boolean) {
    if(!isOk) {
      this.isDataValid = false;
      this.validationMessages.push("Image is not valid");
    }
  }

  public isImageBlank(isBlank: boolean) {
    if(isBlank) {
      this.isDataValid = false;
      this.validationMessages.push("Image is blank, there is nothing to process");
    }
  }

  public isFormValid(isValid: boolean){
    if(!isValid) {
      this.isDataValid = false;
      this.validationMessages.push("Form is not valid");
    }
  }
}