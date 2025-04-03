import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { ToursComponent } from './pages/tours/tours.component';
import { TourItemComponent } from './pages/tour-item/tour-item.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: 'auth', component: AuthComponent },
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'tours',
        canActivate: [authGuard],
        component: LayoutComponent,
        children: [
            { path: '', component: ToursComponent,},
            { path: 'tour', redirectTo: '', pathMatch: 'full'},
            { path: 'tour/:id', component: TourItemComponent}
        ]
    },

    { path: '**', redirectTo: '/auth', pathMatch: 'full' },
];
