import { CursorPostionProvider } from "./cursor-position-provider";
import { IDrafter } from "./i-drafter";

export class TriangleDrafter implements IDrafter {
  private cursorPositionProvider: CursorPostionProvider = new CursorPostionProvider(this.canvas);
  private context: CanvasRenderingContext2D;
  private initialPosition: { x: number, y: number } | undefined;

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
      this.initialPosition = position;
    }
  }

  public drawing($event: MouseEvent | TouchEvent): void {
    $event.preventDefault();

    //TODO: drawing of triangle in upper layer, so user can see shape he's actually creating
  }

  public stopDrawing($event: MouseEvent | TouchEvent): void {
    $event.preventDefault();
    const position = this.cursorPositionProvider.getCursorPosition($event);
    this.penDown = false;

    if (position && this.initialPosition) {
      const topX = this.initialPosition.x + ((position.x - this.initialPosition.x) / 2);
      const topY = this.initialPosition.y;

      const leftBotX = this.initialPosition.x;
      const leftBotY = position.y;

      const rightBotX = position.x;
      const rightBotY = position.y;

      this.context.beginPath();
      this.context.moveTo(topX, topY);
      this.context.lineTo(leftBotX, leftBotY);
      this.context.lineTo(rightBotX, rightBotY);
      this.context.fill();
    }
  }
}