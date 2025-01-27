import { Routes } from '@angular/router';

export const routes: Routes = [
    //ruta raiz
    {
        path: '',
        loadComponent: () => import('./contact-list/contact-list.component')

    },
    //ruta del boton (nuevo contacto)
    {
        path: 'new',
        loadComponent: () => import('./contact-form/contact-form.component')

    },
    //ruta de boton (Editar)
    {
        path: ':id/edit',
        loadComponent: () => import('./contact-form/contact-form.component')
    },

];
