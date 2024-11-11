import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'issue-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './issue-loader.component.html',
  styleUrl: './issue-loader.component.scss'
})
export class IssueLoaderComponent {}
