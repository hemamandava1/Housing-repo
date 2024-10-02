import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  template:`
          <main>
            <header class="brand-name">
              <img class="brand-logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgKKFPeMsaPeoNqKw8i_0JPaPxr1mc6UiJjlCW_CFT2P7s7Piut9qXcQUful1SDgd7TRc&usqp=CAU" alt="logo" aria-hidden="true"  width ="60px">
              <b>Homes</b>
            </header>
            <section class="content"> 
            <router-outlet></router-outlet>
            </section>
          </main>`
            ,
  styleUrls: ['./app.component.css'],
  imports: [HomeComponent, RouterModule]
})
export class AppComponent {
  title = 'Main page';
}
