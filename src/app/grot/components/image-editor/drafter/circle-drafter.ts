import { CursorPostionProvider } from "./cursor-position-provider";
import { IDrafter } from "./i-drafter";

export class CircleDrafter implements IDrafter {
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
      const x = this.initialPosition.x + ((position.x - this.initialPosition.x)/2);
      const y = this.initialPosition.y + ((position.y - this.initialPosition.y)/2);
      const radiusX = (position.x - this.initialPosition.x) / 2;
      const radiusY = (position.y - this.initialPosition.y) / 2;

      this.context.beginPath();
      this.context.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
      this.context.fill();
    }
  }
}