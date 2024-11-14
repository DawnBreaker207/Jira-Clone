import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResizerComponent } from '../resizer/resizer.component';
import { NavbarLeftComponent } from "../navbar-left/navbar-left.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [ResizerComponent, CommonModule, NavbarLeftComponent, SidebarComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  @Input() expanded!: boolean;
  @Output() manualToggle = new EventEmitter();

  toggle() {
    this.manualToggle.emit();
  }
}
