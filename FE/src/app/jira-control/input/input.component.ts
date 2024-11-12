import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'j-input',
  standalone: true,
  imports: [SvgIconComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() containerClassName = '';
  @Input() icon!: string;
  @Input() iconSize = 16;
  @Input() placeholder = '';
  @Input() enableClearButton!: boolean;

  get iconContainerWidth(): number {
    return this.iconSize * 2;
  }

  get isShowClearButton(): boolean {
    return this.enableClearButton && this.control?.value;
  }

  constructor() {}

  ngOnInit(): void {
    this.control = this.control ?? new FormControl('');
  }

  clear() {
    this.control.patchValue('');
  }
}
