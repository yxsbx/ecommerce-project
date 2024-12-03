import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildService } from '../../../core/services/child.service';

@Component({
  selector: 'app-child-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.css'],
})
export class ChildListComponent implements OnInit {
  children: any[] = [];

  constructor(private childService: ChildService) {}

  async ngOnInit() {
    this.children = await this.childService.getChildren();
  }
}
