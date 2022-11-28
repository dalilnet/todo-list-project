import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { Response as ExpressResponse } from 'express';

/**
 *  une class intercepteur qui permet d'ajouter la date retourned a chaque reponse
 */
@Injectable()
export class ResponseAddReturnedDateToHeaderInterceptor
  implements NestInterceptor
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const responseObj: ExpressResponse = context.switchToHttp().getResponse();
    const returnedDate = new Date();

    responseObj.setHeader(
      'Returned-At',
      `${returnedDate.toLocaleDateString(
        'fr-FR',
      )} ${returnedDate.toLocaleTimeString('fr-FR')}`,
    );

    return next.handle();
  }
}
