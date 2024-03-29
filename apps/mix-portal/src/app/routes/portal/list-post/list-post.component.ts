import { Component } from '@angular/core';
import { ShareModule } from '@mix-spa/mix.share';

@Component({
  selector: 'mix-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss'],
  standalone: true,
  imports: [ShareModule]
})
export class ListPostComponent {}
