export class CursorPostionProvider {

  private _touch: Touch | undefined;

  private get lastTouch(): Touch {
    return this._touch as Touch;
  }

  constructor(private canvas: HTMLCanvasElement){

  }

  public getCursorPosition($event: MouseEvent | TouchEvent): { x: number, y: number } | undefined {
    let cords = { x: 0, y: 0 };

    if ($event instanceof (MouseEvent)) {
      if (this.canvas) {
        const rect = this.canvas.getBoundingClientRect();
        cords.x = $event.clientX - rect.left;
        cords.y = $event.clientY - rect.top;
      }
    }

    if (window.TouchEvent && $event instanceof (TouchEvent)) {
      const rect = this.canvas.getBoundingClientRect();
      if ($event.touches[0]) {        
        cords.x = $event.touches[0].clientX - rect.left;
        cords.y = $event.touches[0].clientY - rect.top;
        this._touch = $event.touches[0];
      } else {
        cords.x = this.lastTouch.clientX - rect.left;
        cords.y = this.lastTouch.clientY - rect.top;
      }
    }

    return cords;
  }
}