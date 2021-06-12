import { CircleDrafter as ElipseDrafter } from "./circle-drafter";
import { Shape } from "./e-shape";
import { IDrafter } from "./i-drafter";
import { LineDrafter } from "./line-drafter";
import { RectangleDrafter } from "./rectangle-drafter";
import { TriangleDrafter } from "./triangle-drafter";

export class Drafter implements IDrafter {

  private _drafter: IDrafter | undefined;

  private get drafter(): IDrafter {
    return this._drafter as IDrafter;
  }

  constructor(
    private canvas: HTMLCanvasElement,
    private shape: Shape,
    private penDown: boolean
  ) {
    this.selectShape(this.shape)
  }

  public selectShape(shape: Shape) {
    switch (shape) {
      case Shape.rectangle:
        {
          this._drafter = new RectangleDrafter(this.canvas, this.penDown);
        }
        break;
      case Shape.triangle:
        {
          this._drafter = new TriangleDrafter(this.canvas, this.penDown);
        }
        break;
      case Shape.circle:
        {
          this._drafter = new ElipseDrafter(this.canvas, this.penDown);
        }
        break;
      case Shape.line:
      default:
        {
          this._drafter = new LineDrafter(this.canvas, this.penDown);
        }
        break;
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
}
