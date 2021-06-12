import { CursorPostionProvider } from "./cursor-position-provider";
import { IDrafter } from "./i-drafter";

export class LineDrafter implements IDrafter {

  private cursorPositionProvider: CursorPostionProvider = new CursorPostionProvider(this.canvas);
  private context: CanvasRenderingContext2D;

  constructor(
    private canvas: HTMLCanvasElement,
    private penDown: boolean
  ) {
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  public startDrawing($event: MouseEvent | TouchEvent): void {
    $event.preventDefault();
    const position = this.cursorPositionProvider.getCursorPosition($event);
    this.penDown = true;

    if (position) {
      this.context.beginPath();
      this.context.moveTo(position.x, position.y);
      this.context.stroke();
    }
  }

  public drawing($event: MouseEvent | TouchEvent): void {
    $event.preventDefault();
    if (this.penDown) {
      const position = this.cursorPositionProvider.getCursorPosition($event);

      if (position) {
        this.context.lineTo(position.x, position.y);
        this.context.stroke();
      }
    }
  }

  public stopDrawing($event: MouseEvent | TouchEvent): void {
    $event.preventDefault();
    const position = this.cursorPositionProvider.getCursorPosition($event);
    this.penDown = false;

    if (position) {
      this.context.lineTo(position.x, position.y);
      this.context.stroke();
    }
  }

}