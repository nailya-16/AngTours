import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullNamePipe'
})
export class FullNamePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const parts = value.trim().split(' ');
    if (parts.length < 3) return value;

    const [lastName, firstName, middleName] = parts;
    return `${lastName} ${firstName.charAt(0)}.${middleName.charAt(0)}.`;
  }
}