import {CallHandler,ExecutionContext,Injectable,NestInterceptor,} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service'; 
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class UpdatePhoneInterceptor implements NestInterceptor {
    constructor(private readonly prisma: PrismaService) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      return next.handle().pipe(
        tap(async () => {
          if (!user?.id) return;
  
          
        }),
      );
    }
  }
  