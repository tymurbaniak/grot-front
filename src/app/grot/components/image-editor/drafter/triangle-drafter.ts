import { CursorPostionProvider } from "./cursor-position-provider";
import { IDrafter } from "./i-drafter";

export class TriangleDrafter implements IDrafter {
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
        this.draw(position, this.initialPosition, this.outlineCtx);
      }
    }
  }

  private draw(
    position: { x: number; y: number; },
    initialPosition: { x: number; y: number; },
    context: CanvasRenderingContext2D): void {
    const topX = initialPosition.x + ((position.x - initialPosition.x) / 2);
    const topY = initialPosition.y;

    const leftBotX = initialPosition.x;
    const leftBotY = position.y;

    const rightBotX = position.x;
    const rightBotY = position.y;

    context.beginPath();
    context.moveTo(topX, topY);
    context.lineTo(leftBotX, leftBotY);
    context.lineTo(rightBotX, rightBotY);
    context.fill();
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
}