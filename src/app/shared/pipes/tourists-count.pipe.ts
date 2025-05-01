import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'touristsCountPipe'
})
export class TouristsCountPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 1) return `${value} турист`;
    if (value > 1 && value < 5) return `${value} туриста`;
    return `${value} туристов`;
  }
}