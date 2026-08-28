import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Route Guard untuk mengamankan halaman Dashboard.
 * Mencegah pengguna yang belum login mengakses rute internal.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    return true;
  } else {
    // Jika belum login, tendang ke halaman login
    router.navigate(['/login']);
    return false;
  }
};
