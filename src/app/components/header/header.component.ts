import { environment as env } from 'src/environments/environment';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  protected env = env; // so it can be accessed in the component's template
}
