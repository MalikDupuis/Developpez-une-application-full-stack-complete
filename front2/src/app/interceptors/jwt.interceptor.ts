import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Vérifiez si localStorage est disponible
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('jwtKey');
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(clonedRequest);
    }
  }

  // Passez simplement la requête si aucun token n'est trouvé ou si localStorage n'est pas accessible
  return next(req);
};
