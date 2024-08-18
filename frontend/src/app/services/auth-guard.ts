import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (typeof window !== 'undefined') {
      const login = JSON.parse(localStorage.getItem('login') || 'false');
  
      if (login === true) {
        return true; 
      } else {
        router.navigate(['/login']);
        return false; 
      }
    } else {
      return false;
    }
};
  
export const loginGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (typeof window !== 'undefined' && localStorage) {
      if (!localStorage.getItem('login')) {
        localStorage.setItem('login', 'false');
      }
      const login = JSON.parse(localStorage.getItem('login')!);
  
      if (login === false || login === null) {
        return true;
      } else {
        router.navigate(['/homepage']);
        return false;
      }
    } else {
      return false;
    }


};
     