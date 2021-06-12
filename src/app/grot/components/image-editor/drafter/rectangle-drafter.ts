import { CursorPostionProvider } from "./cursor-position-provider";
import { IDrafter } from "./i-drafter";

export class RectangleDrafter implements IDrafter {

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
    if (this.penDown) {
      const position = this.cursorPositionProvider.getCursorPosition($event);

      if (position && this.initialPosition) {
        this.outlineCtx.clearRect(0, 0, this.outline.width, this.outline.height);
        const width = position.x - this.initialPosition.x;
        const height = position.y - this.initialPosition.y;

        this.outlineCtx.fillRect(this.initialPosition.x, this.initialPosition.y, width, height);
      }
    }
  }

  public stopDrawing($event: MouseEvent | TouchEvent): void {
    $event.preventDefault();
    const position = this.cursorPositionProvider.getCursorPosition($event);
    this.penDown = false;

    if (position && this.initialPosition) {
      const width = position.x - this.initialPosition.x;
      const height = position.y - this.initialPosition.y;

      this.context.fillRect(this.initialPosition.x, this.initialPosition.y, width, height);
      this.outlineCtx.clearRect(0, 0, this.outline.width, this.outline.height);
    }
  }

}