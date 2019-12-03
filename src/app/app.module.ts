import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GitSearchService } from './git-search.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GitSearchComponent } from './git-search/git-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [ //Se define el arreglo de rutas para la aplicacion
  { path: '',
    component: HomePageComponent

  },
  { path: 'search',
    redirectTo: '/search/angular/1',
    pathMatch: 'full' //para que haga match completo con search y no i.e. match/java
  },
  {
    path: 'search/:query',
    component: GitSearchComponent,
    data: { title: 'Git Search'}
  },
  {
    path: 'search/:query/:page',
    component: GitSearchComponent,
    data: { title: 'Git Search'}
  },
  {path: '**', component: NotFoundComponent} //Ruta para mostrar Not Found 404 y demas rutas que no coincidan con el arreglo
];

@NgModule({
  declarations: [
    AppComponent,
    GitSearchComponent,
    HomePageComponent,
    NotFoundComponent
  ],
  imports: [ //Arreglo de componentes disponibles para la aplicacion
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot( //Para que las rutas esten disponibles en la aplicacion
      appRoutes
    )
  ],
  providers: [GitSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
