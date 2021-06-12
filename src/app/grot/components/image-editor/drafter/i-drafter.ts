export interface IDrafter {
  startDrawing($event: MouseEvent | TouchEvent): void;
  drawing($event: MouseEvent | TouchEvent): void;
  stopDrawing($event: MouseEvent | TouchEvent): void;
}