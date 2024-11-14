import { AfterContentInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

const BASE_TIME_DELAY = 10;
@Directive({
  selector: '[jAutofocus]',
  standalone: true
})
export class AutofocusDirective implements AfterContentInit, OnDestroy {
  @Input('jAutofocus') enable!: boolean | string;
  @Input() timerDelay: number = BASE_TIME_DELAY;

  private elementRef: ElementRef;
  private timer: any;
  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
    this.timer = null;
  }

  public ngAfterContentInit(): void {
    this.setDefaultValue();
    if (this.enable) {
      this.startFocusWorkFlow();
    }
  }

  private setDefaultValue() {
    if (this.enable === false) {
      return;
    }
    this.enable = true;
  }
  private startFocusWorkFlow(): void {
    if (this.timer) {
      return;
    }

    this.timer = setTimeout((): void => {
      this.timer = null;
      this.elementRef.nativeElement.focus();
    }, this.timerDelay);
  }

  private stopFocusWorkFlow(): void {
    clearTimeout(this.timer);
    this.timer = null;
  }
  public ngOnDestroy(): void {
    this.stopFocusWorkFlow();
  }
}
