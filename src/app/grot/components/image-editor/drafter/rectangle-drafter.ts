import { CursorPostionProvider } from "./cursor-position-provider";
import { IDrafter } from "./i-drafter";

export class RectangleDrafter implements IDrafter {
  
  private cursorPositionProvider: CursorPostionProvider = new CursorPostionProvider(this.canvas);
  private context: CanvasRenderingContext2D;
  private initialPosition: { x: number, y: number} | undefined;

  constructor(
    private canvas: HTMLCanvasElement,
    private penDown: boolean
  ){
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

    //TODO: drawing of rectangle in upper layer, so user can see shape he's actually creating
  }

  public stopDrawing($event: MouseEvent | TouchEvent): void {
    $event.preventDefault();
    const position = this.cursorPositionProvider.getCursorPosition($event);
    this.penDown = false;

    if (position && this.initialPosition) {      
      const width = position.x - this.initialPosition.x;
      const height = position.y - this.initialPosition.y;

      this.context.fillRect(this.initialPosition.x, this.initialPosition.y, width, height);      
    }
  }

}