import { Routes } from '@angular/router';

export const routes: Routes = [
    //ruta raiz
    {
        path: '',
        loadComponent: () => import('./contact-list/contact-list.component')

    }

];
