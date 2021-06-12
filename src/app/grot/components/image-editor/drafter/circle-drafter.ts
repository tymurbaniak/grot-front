import { CursorPostionProvider } from "./cursor-position-provider";
import { IDrafter } from "./i-drafter";

export class CircleDrafter implements IDrafter {
  private cursorPositionProvider: CursorPostionProvider = new CursorPostionProvider(this.canvas);
  private context: CanvasRenderingContext2D;
  private outlineCtx: CanvasRenderingContext2D;
  private initialPosition: { x: number, y: number } | undefined;

  constructor(
    private canvas: HTMLCanvasElement,
    private outline: HTMLCanvasElement,
    private penDown: boolean
  ) {
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.outlineCtx = outline.getContext("2d") as CanvasRenderingContext2D;
  }

  public startDrawing($event: MouseEvent | TouchEvent): void {
    $event.preventDefault();
    const position = this.cursorPositionProvider.getCursorPosition($event);
    this.penDown = true;

    if (position) {
      this.initialPosition = position;
    }
  }

  public drawing($event: MouseEvent | TouchEvent): void {
    $event.preventDefault();

    if(this.penDown){
      const position = this.cursorPositionProvider.getCursorPosition($event);
      if (position && this.initialPosition) {
        this.outlineCtx.clearRect(0, 0, this.outline.width, this.outline.height);
        this.draw(position, this.initialPosition, this.outlineCtx);
      }
    }
    //TODO: drawing of triangle in upper layer, so user can see shape he's actually creating
  }

  public stopDrawing($event: MouseEvent | TouchEvent): void {
    $event.preventDefault();
    const position = this.cursorPositionProvider.getCursorPosition($event);
    this.penDown = false;

    if (position && this.initialPosition) {
      this.draw(position, this.initialPosition, this.context);
      this.outlineCtx.clearRect(0, 0, this.outline.width, this.outline.height);
    }
  }

  private draw(
    position: { x: number; y: number; },
    initialPosition: { x: number; y: number; },
    context: CanvasRenderingContext2D) {
    const x = initialPosition.x + ((position.x - initialPosition.x) / 2);
    const y = initialPosition.y + ((position.y - initialPosition.y) / 2);
    const radiusX = Math.abs((position.x - initialPosition.x) / 2);
    const radiusY = Math.abs((position.y - initialPosition.y) / 2);

    context.beginPath();
    context.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
    context.fill();
  }
}