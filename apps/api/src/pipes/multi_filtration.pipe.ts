import { Injectable, PipeTransform } from '@nestjs/common';

import { MultiFiltrationData } from 'apps/libs/interfaces';

@Injectable()
export class MultiFiltration implements PipeTransform {
  transform(obj: MultiFiltrationData) {
    const newObj: MultiFiltrationData = {};

    for (const [key, value] of Object.entries(obj)) {
      if (key.startsWith('q')) newObj[`${key}`] = value.trim();
    }

    return newObj;
  }
}
