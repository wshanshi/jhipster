import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                ...LAYOUT_ROUTES,
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#TestJhipster3AdminModule'
                }
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        )
    ],
    exports: [RouterModule]
})
export class TestJhipster3AppRoutingModule {}