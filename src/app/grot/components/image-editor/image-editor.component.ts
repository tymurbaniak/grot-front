import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { ParameterValue } from '../../models/parameter-value';
import { ComService } from '../../services/com.service';
import { ProcessService } from '../../services/process.service';
import { MessageService } from 'primeng/api';
import { ProcessValidator } from '../../services/process-validator';
import { Drafter } from './drafter/drafter';
import { Shape } from './drafter/e-shape';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss']
})
export class ImageEditorComponent implements AfterViewInit, OnInit {

  private context2d: CanvasRenderingContext2D | undefined;
  private penDown = false;
  private inputParameters: ParameterValue[] = [];
  private gridDisplayed: boolean = false;
  private _drafter: Drafter | undefined;
  private get drafter(): Drafter {
    return this._drafter as Drafter;
  }

  public colors = ['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#000', '#fff'];
  public sizes = [
    { name: '3', value: 3 },
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '15', value: 15 }
  ];
  public selectedColor = '#000';
  public selectedSize = '3';
  public shape = Shape;

  set context(ctx: CanvasRenderingContext2D) {
    this.context2d = ctx;
  }

  get context(): CanvasRenderingContext2D {
    return this.context2d as CanvasRenderingContext2D;
  }

  @ViewChild('canv', { static: true }) private canvas: ElementRef<HTMLCanvasElement> | undefined;
  @ViewChild('grid', { static: true }) private grid: ElementRef<HTMLCanvasElement> | undefined;
  @ViewChild('outline', { static: true }) private outline: ElementRef<HTMLCanvasElement> | undefined;
  @ViewChild('fileUpload', { static: true }) private fileUpload: FileUpload | undefined;

  constructor(
    private processService: ProcessService,
    private comService: ComService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.comService.parameters$.subscribe((parameters: any) => {
      this.inputParameters = parameters;
    });
  }

  public ngAfterViewInit(): void {
    this.onResize();

    if (this.canvas && this.outline) {
      this.context = this.canvas.nativeElement.getContext("2d") as CanvasRenderingContext2D;
      this.context.fillStyle = "white";
      this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      this._drafter = new Drafter(this.canvas.nativeElement, this.outline.nativeElement, Shape.line, this.penDown);
      this.context.fillStyle = this.context.strokeStyle;
    }
  }

  public onResize(): void {
    if (this.canvas) {
      const tmpCanvas = document.createElement("canvas");
      tmpCanvas.height = this.canvas.nativeElement.height;
      tmpCanvas.width = this.canvas.nativeElement.width;
      const tmpCtx = tmpCanvas.getContext("2d");

      if (tmpCtx) {
        tmpCtx.drawImage(this.canvas.nativeElement, 0, 0);
      }

      this.canvas.nativeElement.height = this.canvas.nativeElement.clientHeight;
      this.canvas.nativeElement.width = this.canvas.nativeElement.clientWidth;
      const context = this.canvas.nativeElement.getContext("2d");

      if (this.grid) {
        this.grid.nativeElement.height = this.grid.nativeElement.clientHeight;
        this.grid.nativeElement.width = this.grid.nativeElement.clientWidth;
      }

      if (this.outline) {
        this.outline.nativeElement.height = this.outline.nativeElement.clientHeight;
        this.outline.nativeElement.width = this.outline.nativeElement.clientWidth;
      }

      if (context) {
        context.drawImage(tmpCanvas, 0, 0, tmpCanvas.width, tmpCanvas.height, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        context.strokeStyle = this.selectedColor;
        context.lineWidth = Number.parseInt(this.selectedColor);
      }
    }
  }

  public startDrawing($event: MouseEvent | TouchEvent): void {
    this.drafter.startDrawing($event);
  }

  public drawing($event: MouseEvent | TouchEvent): void {
    this.drafter.drawing($event);
  }

  public stopDrawing($event: MouseEvent | TouchEvent): void {
    this.drafter.stopDrawing($event);
  }

  public setColor($color: string): void {
    this.selectedColor = $color;
    this.context.strokeStyle = $color;
    this.context.fillStyle = $color;

    if (this.outline) {
      const outlineCtx = this.outline.nativeElement.getContext("2d") as CanvasRenderingContext2D;
      outlineCtx.fillStyle = $color;
      outlineCtx.strokeStyle = $color;
    }
  }

  public sizeChanged($size: any): void {
    this.selectedSize = $size.value.value;
    this.context.lineWidth = $size.value.value;
  }

  public setCanvasImage($event: any): void {
    const files = $event.files;
    const img = new Image();
    img.onload = () => {
      if (this.canvas) {
        const width = this.canvas.nativeElement.clientWidth;
        const height = this.canvas.nativeElement.clientHeight;
        this.context.drawImage(img, 0, 0, width, height);
      }
    };
    img.src = URL.createObjectURL(files[0]);

    if (this.fileUpload) {
      this.fileUpload.clear();
    }
  }

  public onProcessClicked($event: any): void {
    const validator = new ProcessValidator();
    validator.isImageOk(this.canvas !== undefined);
    validator.isImageBlank(this.isCanvasBlank());
    validator.isFormValid(this.comService.areParametersValid());

    if (!validator.isDataValid) {
      this.comService.setProcessDataInvalid(validator);
      return;
    }

    if (this.canvas) {
      const canvasDataUrl = this.canvas.nativeElement.toDataURL();

      this.processService.process(this.inputParameters, canvasDataUrl).subscribe((process: any) => {
        if (process.started) {
          console.log("Process started");
          this.messageService.add({ severity: 'success', summary: 'Processing started', detail: '' });
          this.comService.addProcessedProject(process.id);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Something went wrong', detail: '' });
        }
      });
    }
  }

  private isCanvasBlank(): boolean {
    if (this.canvas) {
      const ctx = this.canvas.nativeElement.getContext("2d");
      if (ctx) {
        return !ctx
          .getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height).data
          .some(channel => channel !== 0);
      }
    }

    return true;
  }

  public selectShape(shape: Shape) {
    this.drafter.selectShape(shape);
  }

  public clearCanvas() {
    if (this.canvas) {
      this.context.fillStyle = "white";
      this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      this.context.fillStyle = this.selectedColor;
    }
  }

  public toggleGrid(): void {
    if (this.gridDisplayed) {
      if (this.grid) {
        this.gridDisplayed = false;
        const ctx = this.grid.nativeElement.getContext("2d") as CanvasRenderingContext2D;
        const width = this.grid.nativeElement.width;
        const height = this.grid.nativeElement.height;

        ctx.clearRect(0, 0, width, height);
      }
    } else {
      if (this.grid) {
        this.gridDisplayed = true;
        const ctx = this.grid.nativeElement.getContext("2d") as CanvasRenderingContext2D;
        const width = this.grid.nativeElement.width;
        const height = this.grid.nativeElement.height;
        ctx.lineWidth = 1;

        const numberOfLines = 5;

        for (let i = 1; i <= numberOfLines; i++) {
          const x = Math.floor((width * i) / numberOfLines) + 0.5;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        for (let i = 1; i <= numberOfLines; i++) {
          const y = Math.floor((height * i) / numberOfLines) + 0.5;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }
    }
  }

}
