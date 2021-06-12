export class CursorPostionProvider {

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
      if (this.canvas && $event.touches[0]) {
        const rect = this.canvas.getBoundingClientRect();
        cords.x = $event.touches[0].clientX - rect.left;
        cords.y = $event.touches[0].clientY - rect.top;
      } else {
        return undefined;
      }
    }

    return cords;
  }
}