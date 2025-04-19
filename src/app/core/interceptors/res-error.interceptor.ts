import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const resErrorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
      catchError((error)=>{
        console.log("from interceptor",error);
        return throwError(()=>error);
        
      })
    );
};
